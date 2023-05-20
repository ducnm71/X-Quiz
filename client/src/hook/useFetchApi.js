import { useEffect, useState } from 'react';

export default function useFetchApi(url) {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const respData = await response.json();
      setData(respData);
      setFetched(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const authLogin = async (dataForm) => {
    try {
      setLoading(true);
     const resp =  await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForm),
      });
      setData(resp)
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const register = async (dataForm) => {
    try {
      setLoading(true);
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForm),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, fetched, setData, authLogin, register };
}
