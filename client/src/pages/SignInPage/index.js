import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Typography, Divider, message } from 'antd';
import {
  GoogleOutlined,
  FacebookFilled,
  GithubOutlined,
  MailOutlined,
  LockOutlined,
  RollbackOutlined,
} from '@ant-design/icons';

import './style.css';
import { login } from '~/redux/actions';
import { selectAccessToken, selectMessage } from '~/redux/selectors';

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const messageNotificaiton = useSelector(selectMessage);

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('The two passwords you entered do not match!');
    },
  });

  const loginSocial = () => {
    message.success('Login Success!');
  };

  const handleSubmit = async (val) => {
    try {
      const dispatchResult = await dispatch(login(val));
      if (!dispatchResult) {
        message.error(`${messageNotificaiton}`);
      } else {
        message.success(`${messageNotificaiton}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('An error occurred during login');
    }
  };

  useEffect(() => {
    if (accessToken) navigate('/');
  }, [accessToken]);

  return (
    <div id="singin-page">
      <div className="back-home">
        <Link to="/">
          <RollbackOutlined className="back-home__icon" />
        </Link>
      </div>
      <Form
        name="basic"
        style={{
          maxWidth: 600,
        }}
        onFinish={handleSubmit}
        size={'large'}
        className="loginForm"
        layout="vertical"
      >
        <Typography.Title style={{ textAlign: 'center', fontWeight: 700 }} level={1}>
          Login to your Account
        </Typography.Title>

        <Form.Item
          className="form-item"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter valid email',
            },
          ]}
          label={
            <span>
              <MailOutlined style={{ marginRight: 8 }} />
              Email
            </span>
          }
          name="email"
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          className="form-item"
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
            validatePassword,
          ]}
          label={
            <span>
              <LockOutlined style={{ marginRight: 8 }} />
              Password
            </span>
          }
          name="password"
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Button style={{ marginTop: 16 }} type="primary" htmlType="submit" block>
          Login
        </Button>
        <Typography.Text style={{ fontSize: 20 }}>Not a member?</Typography.Text>

        <Typography.Text style={{ fontSize: 20, color: '#1677ff', cursor: 'pointer' }}>
          <Link to="/signup">Register</Link>
        </Typography.Text>
        <Divider style={{ borderColor: 'black' }}>or Login with</Divider>
        <div className="socialLogin">
          <GoogleOutlined className="socialIcon" onClick={loginSocial} />
          <FacebookFilled className="socialIcon" onClick={loginSocial} />
          <GithubOutlined className="socialIcon" onClick={loginSocial} />
        </div>
      </Form>
    </div>
  );
}
export default SignInPage;
