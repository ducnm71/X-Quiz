import React, { useEffect, useState } from 'react';

export default function useFetchApi(url) {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function loadData() {
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

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, fetched, setData };
}
