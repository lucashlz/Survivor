import ax from 'axios';
import { getAuthToken } from './auth.service';
import Bottleneck from 'bottleneck';
const groupTokenKey = 'X-Group-Authorization';
const groupToken = '2f7f9f8443b2cd675200b14d6bc189d3';
const apiBaseUrl = 'https://masurao.fr/api';

const limiter = new Bottleneck({ 
  minTime: 200,
});


let axios = ax.create({
  baseURL: apiBaseUrl,
  headers: {
    common: {
      [groupTokenKey]: groupToken,
      'Content-Type': 'application/json'}
}});

const rateLimitedAxios = async (fn, ...args) => {
  return await limiter.schedule(() => fn(...args));
};

axios.interceptors.request.use(req => {return req;});
axios.interceptors.response.use(
  res => {return res;},
  err => {return handleResponseError(err);}
);

const handleResponseError = (err) => {
  console.log('Error:', err);
  return Promise.reject(err);
};

export const loginRequest = async (email, password) => {
  const response = await axios.post('/employees/login', {
    email: email,
    password: password
  });
  if (response.data.access_token) {
    return response.data.access_token;
  } else {
    throw new Error('Invalid Email or Password');
  }
};

const getReqConfig = async (path, errorMsg, responseType = 'json') => {
  const token = await getAuthToken();
  if (token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  else
    throw new Error('Unable to retrieve auth token');
  const response = await rateLimitedAxios(axios.get, path, { responseType: responseType });
  if (response.status >= 200 && response.status < 300)
    return response.data;
  throw new Error(errorMsg);
};

export const getPersonalData = async () => {
  return await getReqConfig(
    '/employees/me', 'Unable to retrieve personal data');
};

export const getEmployees = async () => {
  return await getReqConfig(
    '/employees', 'Unable to retrieve employees');
}

export const getEmployee = async (id) => {
  return await getReqConfig(
    '/employees/' + id, 'Unable to retrieve employee');
}

export const getLeaders = async () => {
  return await getReqConfig(
    '/employees/leaders', 'Unable to retrieve leaders');
}

export const getEmployeeImage = async (id) => {
  const token = await getAuthToken();
  if (token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  else
    throw new Error('Unable to retrieve auth token');
  const response = await rateLimitedAxios(axios.get, '/employees/' + id + '/image', { responseType: 'blob' });
  if (response.status >= 200 && response.status < 300)
    return response.data;
  throw new Error('Unable to retrieve employee image');
};
