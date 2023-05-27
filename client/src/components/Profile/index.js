import React from 'react';
import { Modal, Form, Input, Button, Upload, Avatar } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';

const Profile = () => {
  const handleClose = () => {};

  const handleChange = (info) => {};

  //   const handleSubmit = (values) => {
  //     const name = values.name;
  //     updateProfile(currentUser, { name, file: profile.file }, dispatch);
  //   };

  return (
    <Modal centered width={360} visible onCancel={handleClose} footer={null}>
      <Form initialValues>
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
            <Avatar size={100} src icon={<UploadOutlined />} />
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
