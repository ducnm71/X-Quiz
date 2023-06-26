import { useState } from 'react';
import { Form, Button, Typography, Row, Col, Modal } from 'antd';

import './style.css';
import Question from '~/components/Question';
import withAuth from '~/redux/withAuth';
import useFetchApiQuestion from '~/hooks/useFetchQuestion';

function QuestionPage() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const url = process.env.REACT_APP_SERVER_URL + 'question';

  const idRoom = window.location.pathname.split('/')[1];
  const nameRoom = window.location.pathname.split('/')[2];

  const { Title, Paragraph } = Typography;

  const { data, createQuestion, deleteQuestion } = useFetchApiQuestion(url, idRoom);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleFinish = (values) => {
    setConfirmLoading(true);
    const { description, answer1, answer2, answer3, answer4, correct } = values;
    createQuestion({ description, answer1, answer2, answer3, answer4, correct });
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <div style={{ margin: 30, padding: '24px 50px' }}>
      <div className="nameroom-btn">
        <Title level={3}>Room Name : {nameRoom}</Title>
        <div>
          <Button className="add-question" onClick={showModal}>
            Add Question
          </Button>
          <Button className="start">Start</Button>
        </div>
      </div>
      {data.map((item) => {
        return (
          <div key={item._id}>
            <Title level={4}>
              Câu {item.title} : {item.description}{' '}
              <Button className="delete" onClick={() => deleteQuestion(item._id)}>
                Delete
              </Button>{' '}
            </Title>
            <Row>
              <Col span={4}>
                <Paragraph>A: {item.options[0]}</Paragraph>
                <Paragraph>C: {item.options[2]}</Paragraph>
              </Col>
              <Col span={4}>
                <Paragraph>B: {item.options[1]}</Paragraph>
                <Paragraph>D: {item.options[3]}</Paragraph>
              </Col>
            </Row>
          </div>
        );
      })}

      <Modal title="Question" open={open} onCancel={handleCancel} confirmLoading={confirmLoading} onOk={handleOk}>
        <Question form={form} handleFinish={handleFinish} />
      </Modal>
    </div>
  );
}

export default withAuth(false, QuestionPage);
