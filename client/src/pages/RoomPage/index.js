import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Input, Col, Row, Form, Modal } from 'antd';

import './style.css';
import useFetchApi from '~/hooks/useFetchApi';
import withAuth from '~/redux/withAuth';

const RoomPage = () => {
  const { Title } = Typography;

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const url = process.env.REACT_APP_SERVER_URL;
  const id = localStorage.getItem('idUser');

  const { data, createZoom } = useFetchApi(url + 'room', id);

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

    const { name } = values;
    createZoom(name);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 60 }}>
      <Title style={{ marginBottom: 40 }}>Room Manager</Title>
      <Row>
        {data.map((item) => {
          return (
            <Col key={item.id} span={6} offset={1} style={{ border: '1px solid #ccc', marginBottom: 10 }}>
              <Link to={`/${item._id}/${item.name}/question`}>
                <Title level={3}>{item.name}</Title>
              </Link>
              <p>Number of players: {item.players.length}</p>
              <p>Number of questions: {item.questions.length}</p>
            </Col>
          );
        })}
      </Row>
      <Button onClick={showModal} size="large" type="primary">
        New Room
      </Button>
      <Modal title="Room" open={open} onCancel={handleCancel} confirmLoading={confirmLoading} onOk={handleOk}>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item name="name" rules={[{ required: true, message: 'Please enter room name' }]}>
            <Input placeholder="Please enter room name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default withAuth(false, RoomPage);
