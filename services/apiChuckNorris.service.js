import ax from 'axios';

const apiBaseUrl = 'https://api.api-ninjas.com/v1/chucknorris'
const apiKey = 'Tt0lxs7u+Qt1vHxMP+kVFg==OWCXcvrauL9fdbBT'


let axios = ax.create({
  baseURL: apiBaseUrl,
  headers: {
    common: {
      'X-Api-Key': apiKey
    }
  }
});

export const getJoke = async () => {
  const response = await axios.get('');
  if (response.status >= 200 && response.status < 300)
    return response.data;
  throw new Error('Unable to retrieve joke');
}
