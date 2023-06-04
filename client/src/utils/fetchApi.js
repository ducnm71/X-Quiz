import axios from 'axios';

const urlRef = process.env.REACT_APP_SERVER_URL + 'token/refresh';

axios.defaults.withCredentials = true;

export const fetchApi = async ({ url, method = 'POST', token = '', body = null }, dispatch) => {
  const headers = token ? { authorization: `Bearer ${token}` } : {};
  body = body ? body : {};
  try {
    const { data } = await axios({ url, method, headers, data: body });

    if (!data) {
      throw new Error('No content');
    }
    return data;
  } catch ({ message, response: { status } }) {
    if (status === 401) {
      const { data } = await axios({
        url: urlRef,
        method: 'get',
      });
      const { accessToken } = data;
      console.log(accessToken);
    }
    throw new Error(message);
  }
};
