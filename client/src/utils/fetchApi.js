import axios from 'axios';

axios.defaults.withCredentials = true;

export const fetchApi = async ({ url, method = 'POST', token = '', body = null }, dispatch) => {
  const headers = token ? { authorization: `Bearer ${token}` } : {};
  body = body ? body : {};
  try {
    const { data } = await axios({ url, method, headers, data: body });
    if (data.success === false) {
      throw new Error('No content');
    }
    return data;
  } catch ({ message, response: { status, data } }) {
    if (status === 401) {
      return data;
    }
    throw new Error(message);
  }
};
