import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, Button, Typography, Layout, Input, Col, Row, Space, Form, Modal } from 'antd';

import './style.css';
import Logo from '~/assets/imgs/logo.png';
import useFetchApi from '~/hooks/useFetchApi';
import withAuth from '~/redux/withAuth';

const RoomPage = () => {
  const { Header, Content } = Layout;
  const { Title } = Typography;

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [form] = Form.useForm();
  const url = process.env.REACT_APP_SERVER_URL;
  const id = localStorage.getItem('idUser');
  console.log(id);

  const { data, fetchData, createZoom } = useFetchApi(url);

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
    setRoomName(name);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      //  navigate('/room');
    }, 2000);
  };
  const arr = [
    { id: '23123123' },
    { id: 'dsaasdd' },
    { id: 'dsaasdddasd' },
    { id: '23123123' },
    { id: 'dsaasdd' },
    { id: 'dsaasdddasd' },
    { id: 'dsaasdddasd' },
    { id: 'dsaasdddasd' },
    { id: 'dsaasdddasd' },
    { id: 'dsaasdddasd' },
  ];

  return (
    <div style={{ textAlign: 'center', marginTop: 60 }}>
      <Title style={{ marginBottom: 40 }}>Room Manager</Title>
      <Row>
        {arr.map((item) => {
          return (
            <Col span={6} offset={1} style={{ border: '1px solid #ccc', marginBottom: 10 }}>
              <Link to={`/${item.id}/question`}>
                {' '}
                <Title level={3}>Name room</Title>
              </Link>
              <p>Number player</p>
              <p>so cau hoi</p>
              <p>diem cao nhat</p>
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
