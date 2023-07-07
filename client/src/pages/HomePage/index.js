import { Carousel, Button, Input, Form, Typography, Col, Row, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import withAuth from '~/redux/withAuth';

import './index.css';
import { register } from '~/redux/actions';
import { selectMessage } from '~/redux/selectors';

const HomePage = () => {
  const dispatch = useDispatch();
  const messageNotificaiton = useSelector(selectMessage);
  // const [open, setOpen] = useState(false);
  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (value && value.length >= 8 && getFieldValue('password') === value) {
        return Promise.resolve();
      }
      if (value && value.length >= 8) {
        return Promise.reject('The two passwords you entered do not match!');
      }
      return Promise.reject('Password must be at least 8 characters');
    },
  });

  const handleSubmit = async (val) => {
    try {
      const dispatchResult = await dispatch(register(val));

      if (!dispatchResult) {
        message.error(`${messageNotificaiton}`);
      } else {
        await message.success('Register successful');
        await message.success('Login successful');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error(error);
    }
  };

  return (
    <React.Fragment>
      <Carousel waitForAnimate dots={false} autoplay effect="fade" className="homepage--slide">
        <div className="homepage--slide-1 mySlide appear"></div>
        <div className="homepage--slide-2 mySlide"></div>
        <div className="homepage--slide-3 mySlide"></div>
      </Carousel>
      <Row className="home-form-container">
        <Col span={12} className="home--description">
          <Typography.Title
            style={{
              color: 'white',
              fontSize: 50,
              wordSpacing: -3,
            }}
            className="home--desc__title"
          >
            <span
              style={{
                color: '#f86e2f',
              }}
            >
              X-Quizz
            </span>{' '}
            {''}
            is a smart choice for school, friends and family.
          </Typography.Title>
          <Typography.Text className="home--desc__subtitle">
            What is X-Quizz!? X-Quizz! is a game-based learning platform that makes it easy to create, share and play
            learning games or trivia quizzes in minutes. Unleash the fun in classrooms, offices and living rooms!
          </Typography.Text>
          <br />
          <div>
            <Button type={'primary'} className="home--desc__btn" size={'large'}>
              Create Room
            </Button>
            <Button
              type={'transparent'}
              size={'large'}
              style={{
                borderColor: 'white',
                borderWidth: 2,
              }}
              className="home--desc__btn"
            >
              Play
            </Button>
          </div>
        </Col>

        <Col span={12} className="home--signUpForm-container">
          <Form
            className="home--signUpForm"
            size={'large'}
            layout="vertical"
            style={{
              height: 'fit-content',
            }}
            onFinish={handleSubmit}
          >
            <Typography.Title className="home--signUpForm-title">Sign Up to create your free Game</Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please enter your name',
                },
              ]}
              name="name"
            >
              <Input placeHolder={'Enter your name'} className="home--signUpForm__input" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please enter valid email',
                },
              ]}
              name="email"
            >
              <Input placeHolder={'Enter your email'} className="home--signUpForm__input" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please enter your password',
                },
                validatePassword,
              ]}
              name="password"
            >
              <Input.Password placeHolder={'Enter your password'} className="home--signUpForm__input" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please enter your password',
                },
                validatePassword,
              ]}
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
            >
              <Input.Password placeHolder={'Enter password again'} className="home--signUpForm__input" />
            </Form.Item>
            <Button className="home--signUpForm__btn" type="primary" htmlType="submit" block>
              Sign Up Now
            </Button>
            <br />
            <Typography.Text className="home--signUpForm__privacy">
              Your information will not be shared with anyone <Link>(See Privacy policy)</Link>
            </Typography.Text>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withAuth(false, HomePage);
