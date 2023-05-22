const fetApi = async ({ url, method = 'POST', token = '', body = null }, dispatch) => {
  const headers = token
    ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    : { 'Content-type': 'application/json' };
  body = body ? { body: JSON.stringify(body) } : {};
  try {
    const response = await fetch(url, { method, headers, ...body });
    const data = await response.json();
    if (!data) {
      // if (response.status === 401) dispatch({ type: 'UPDATE_USER', payload: null });
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    // dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: error.message } });
    console.log(error);
    return null;
  }
};

export default fetApi;