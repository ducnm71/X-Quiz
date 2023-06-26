import { useEffect, useState } from 'react';
import { delay } from '~/utils/delay';

export default function useFetchApi(url, id) {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataPin, setDataPin] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url + '/getroom/' + id);
      const respData = await response.json();
      setData(respData);
      setFetched(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const createZoom = async (dataForm) => {
    try {
      setLoading(true);
      await fetch(url + '/createroom/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: dataForm }),
      });
      await delay(2000);
      await fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getPin = async (idRoom) => {
    try {
      setLoading(true);
      const resp = await fetch(url + '/getpin/' + idRoom);
      const respData = resp.json();
      setDataPin(respData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, dataPin, setData, createZoom, getPin };
}
