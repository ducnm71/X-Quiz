import { useEffect, useState } from 'react';
import { delay } from '~/utils/delay';

export default function useFetchApi(url, id) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url + '/getroom/' + id);
      const respData = await response.json();
      setData(respData);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  const createRoom = async (dataForm) => {
    try {
      await fetch(url + '/createroom/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: dataForm }),
      });
      await delay(1000);
      await fetchData();
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  const deleteRoom = async (id) => {
    try {
      await fetch(url + `/${id}`, {
        method: 'DELETE',
      });
      await fetchData();
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, setData, createRoom, deleteRoom };
}
