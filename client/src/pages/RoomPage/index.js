import React, { Fragment } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Input, Col, Row, Form, Modal, Layout } from 'antd';
import { EditOutlined } from '@ant-design/icons';

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
    <div style={{ margin: 80 }}>
      <Title style={{ marginBottom: 40, textAlign: 'center' }}>Room Manager</Title>
      <Button onClick={showModal} size="large" type="primary">
        New Room
      </Button>
      <Row style={{ justifyContent: 'space-between' }}>
        {data.map((item) => {
          return (
            <Col key={item.id} span={10} className="room-wrapper">
              <Row className="room-wrapper__top">
                <Link to={`/${item._id}/${item.name}/question`}>
                  <Title level={2}>{item.name}</Title>
                </Link>
              </Row>
              <Row className="room-wrapper__bot">
                <p>
                  Number of players: <strong>{item.players.length}</strong>
                </p>
                <p>
                  Number of questions: <strong>{item.questions.length}</strong>
                </p>
                <Button className="delete" type="light">
                  Delete
                </Button>
                <Button type="primary">Start</Button>
              </Row>
            </Col>
          );
        })}
      </Row>
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
