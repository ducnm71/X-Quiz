import { useEffect, useState } from 'react';
import { delay } from '~/utils/delay';

export default function useFetchApiQuestion(url, id) {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await fetch(url + '/getquestion/' + id);
      const respData = await response.json();
      setData(respData);
      setFetched(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const createQuestion = async ({ description, answer1, answer2, answer3, answer4, correct }) => {
    try {
      setLoading(true);
      await fetch(url + '/addquestion/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.length + 1,
          description: description,
          options: [answer1, answer2, answer3, answer4],
          correctAnswer: correct,
        }),
      });
      await delay(2000);
      await fetchQuestion();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id, idRoom) => {
    try {
      setLoading(true);
      await fetch(url + `/${id}/${idRoom}`, {
        method: 'DELETE',
      });
      await fetchQuestion();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return { data, createQuestion, deleteQuestion };
}
