import ax from 'axios';

const apiBaseUrl = 'https://type.fit/api/quotes'


let axios = ax.create({
  baseURL: apiBaseUrl
});

export const getQuote = async () => {
  const response = await axios.get('');
  if (response.status >= 200 && response.status < 300)
    console.log(response.data)
    return response.data;
  throw new Error('Unable to retrieve quote');
}
