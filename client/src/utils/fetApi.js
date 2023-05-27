const fetApi = async ({ url, method = 'POST', token = '', body = null }, dispatch) => {
  console.log(!!token);
  const headers = token
    ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    : { 'Content-type': 'application/json' };
  body = body ? { body: JSON.stringify(body) } : {};
  try {
    const response = await fetch(url, { method, headers, ...body });
    const data = await response.json();
    if (response.status === 401) throw new Error('The information that is being entered is not correct');

    if (!data) {
      throw new Error('No content');
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetApi;
