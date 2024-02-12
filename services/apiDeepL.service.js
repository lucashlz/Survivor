import ax from 'axios';

const API_BASE_URL = "https://api-free.deepl.com/v2/translate";
const API_KEY = "5e439e21-8155-3c38-daf2-342ae2a6dd65:fx";

let axios = ax.create({
  baseURL: API_BASE_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
      'Authorization': "DeepL-Auth-Key " + API_KEY
    }
  }
});

axios.interceptors.request.use(
  (config) => {
    console.log('Request Interceptor', config);
    return config;
  },
  (error) => {
    console.log('Request Interceptor Error', error);
    return Promise.reject(error);
  }
);

export const getDeepLResponse = async (prompt, targetLanguage) => {
  try {
    const response = await axios.post('', {
      text: [prompt],
      target_lang: targetLanguage,
    });
    if (response.data.translations) {
      return response.data.translations[0];
    }
  } catch (err) {
    console.log('Error:', err);
  }
};
