import { Button, Form, Input, Typography, Divider, message } from 'antd';
import {
  GoogleOutlined,
  FacebookFilled,
  GithubOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';

import './index.css';

import { login, register } from '../../actions/UserAction';
import { useValue } from '../../context/UserAuthContext';

function SignIn() {
  const [isRegister, setIsRegister] = useState(false);
  const [title, setTitle] = useState('Login to your Account');

  const loginSocial = () => {
    message.success('Login Success!');
  };

  const { dispatch } = useValue();

  const handleSubmit = (val) => {
    if (!isRegister) {
      return login(val, dispatch);
    }
    return register(val, dispatch);
  };

  useEffect(() => {
    isRegister ? setTitle('Create an account') : setTitle('Login to your Account');
  }, [isRegister]);

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('The two passwords you entered do not match!');
    },
  });

  return (
    <div id="singin-page">
      <Form
        name="basic"
        style={{
          maxWidth: 600,
        }}
        onFinish={handleSubmit}
        size={'large'}
        className="loginForm"
      >
        <Typography.Title style={{ textAlign: 'center', fontWeight: 700 }} level={1}>
          {title}
        </Typography.Title>
        {isRegister && (
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please enter your name',
              },
            ]}
            label={<UserOutlined />}
            name="name"
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
        )}
        <Form.Item
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter valid email',
            },
          ]}
          label={<MailOutlined />}
          name="email"
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
          label={<LockOutlined />}
          name="password"
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        {isRegister && (
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
              validatePassword,
            ]}
            label={<KeyOutlined />}
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
          >
            <Input.Password placeholder="Enter password again" />
          </Form.Item>
        )}
        {/*<Form.Item*/}

        {/*    name="remember"*/}
        {/*    valuePropName="checked"*/}
        {/*    wrapperCol={{*/}
        {/*      offset: 5,*/}
        {/*    }}*/}
        {/*>*/}
        {/*  <Checkbox className="customCheckbox" style={{fontSize: 20,}}>Remember me</Checkbox>*/}
        {/*</Form.Item>*/}
        <Button type="primary" htmlType="submit" block>
          {isRegister ? 'Register' : 'Login'}
        </Button>
        {!isRegister ? (
          <Typography.Text style={{ fontSize: 20 }}>Not a member?</Typography.Text>
        ) : (
          <Typography.Text style={{ fontSize: 20 }}>Do you have an account?</Typography.Text>
        )}

        <Typography.Text
          style={{ fontSize: 20, color: '#1677ff', cursor: 'pointer' }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Login' : 'Register'}
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
export default SignIn;
