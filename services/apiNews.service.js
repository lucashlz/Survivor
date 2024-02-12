import ax from 'axios';

const AAUTH_API_KEY = '1e4082895da945af8229aa57bac926bd'
const AUTH_API_KEY = '8c63b277ec9145aaaf7ca034b7b496f6'


const API_BASE_URL = 'https://newsapi.org/v2/top-headlines?country=fr&apiKey=' + AUTH_API_KEY

let axios = ax.create({
  baseURL: API_BASE_URL,
});

axios.interceptors.request.use(req => {console.log(req); return req}, err => {console.log(err); return err})
axios.interceptors.response.use(res => {console.log(res); return res}, err => {console.log(err); return err})

export const getNews = async (about, date, sortBy) => {
  try {
    const response = await axios.get();
    if (response && response.status === "error")
      throw new Error(response.message);
    return response;
  } catch (error) {
    console.log(error);
  }
}
