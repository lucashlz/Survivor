import ax from 'axios';

const OPENAI_API_KEY = "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";
const OPENAI_API_BASE_URL = "https://api.openai.com/v1/completions";

let axios = ax.create({
  baseURL: OPENAI_API_BASE_URL,
  headers: {
    common: {
      'Authorization': 'Bearer ' + OPENAI_API_KEY,
    }
}});

axios.interceptors.request.use(req => {
  console.log('Request:', req);
  return req;
});

export const getGPTResponse = async (prompt) => {
  try {
    const response = await axios.post('', {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 1000,
    });
    console.log('Response:', response);
    if (response.data.choices) {
      return response.data.choices[0].text;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (err) {
    console.log('Error:', err);
  }
};
