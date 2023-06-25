import { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';

import Question from '~/components/Question';

function QuestionPage() {
  const [questions, setQuestions] = useState([{ id: 1 }]);

  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const handleAddQuestion = () => {
    const newQuestionId = questions.length + 1;
    const newQuestion = { id: newQuestionId };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter((question) => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  const questionList = questions.map((question) => (
    <Question handleDeleteQuestion={handleDeleteQuestion} index={question.id} />
  ));

  return (
    <div>
      <h1>QuestionPage</h1>
      <div style={{ marginLeft: 40 }}>
        <Form.Item
          style={{ display: 'flex' }}
          rules={[
            {
              type: 'name',
              message: 'Please enter valid email',
            },
          ]}
          label={<span>Room Name</span>}
          name="name"
        >
          <Input placeholder="" />
        </Form.Item>
        <Form style={{ marginTop: 20, marginBottom: 20 }}>
          {questionList}
          <Button style={{ marginBottom: 20, float: 'left' }} onClick={handleAddQuestion}>
            Add Question
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default QuestionPage;
