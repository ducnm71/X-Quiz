import React, { useRef } from 'react';
import { Modal, Form, Input, Button, Upload, Avatar } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';

import { useValue } from '../../context/UserAuthContext';

const Profile = () => {
  const {
    state: { profile, currentUser },
    dispatch,
  } = useValue();

  const handleClose = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { ...profile, open: false } });
  };

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      const photoURL = URL.createObjectURL(info.file.originFileObj);
      dispatch({ type: 'UPDATE_PROFILE', payload: { ...profile, file: info.file.originFileObj, photoURL } });
    }
  };

  //   const handleSubmit = (values) => {
  //     const name = values.name;
  //     updateProfile(currentUser, { name, file: profile.file }, dispatch);
  //   };

  return (
    <Modal centered width={300} visible={profile.open} onCancel={handleClose} footer={null}>
      <Form initialValues={{ name: currentUser?.name }}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Photo">
          <Upload
            style={{ marginLeft: 100 }}
            accept="image/*"
            beforeUpload={() => false}
            onChange={handleChange}
            showUploadList={false}
            maxCount={1}
          >
            <Avatar size={100} src={profile.photoURL} icon={<UploadOutlined />} />
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Profile;
