import React, { useEffect, useState } from 'react';
import { Image, Input, Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

import './index.css';
import EnterBackground from '~/assets/imgs/Enter.jpg';
import logo from '~/assets/imgs/logo.png';
import { socket } from '~/utils/socketio';

const EnterPIN = () => {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('roomNotFound', () => {
      console.log('loi ');
    });

    socket.on('joined', (data) => {
      navigate('/player', { state: data });
    });
  }, []);

  const handleSubmit = (values) => {
    socket.emit('join', { pin: values.pin, name: values.name });
  };

  return (
    <React.Fragment>
      <div
        className="play-container"
        style={{
          backgroundImage: `url(${EnterBackground})`,
        }}
      >
        <Image
          style={{
            borderRadius: 10,
            marginBottom: '20px',
          }}
          width={100}
          src={logo}
          preview={false}
        />
        <div className="pin-input-container">
          <Form onFinish={handleSubmit}>
            <Form.Item name="pin">
              <Input
                placeholder={'Game PIN'}
                style={{
                  marginBottom: '10px',
                  height: '50px',
                  fontWeight: '700',
                  fontSize: '18px',
                }}
              />
            </Form.Item>

            <Form.Item name="name">
              <Input
                placeholder={'Nick Name'}
                style={{
                  marginBottom: '10px',
                  height: '50px',
                  fontWeight: '700',
                  fontSize: '18px',
                }}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              block
              style={{
                width: '100%',
                backgroundColor: 'rgb(51, 51, 51)',
                color: 'white',
                height: '50px',
                fontSize: '20px',
              }}
            >
              Enter
            </Button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EnterPIN;
