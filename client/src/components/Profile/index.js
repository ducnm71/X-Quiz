import React from 'react';
import { Modal, Form, Input, Button, Upload, Avatar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Profile = ({ isModal, handleClose }) => {
  // const handleChange = (info) => {};

  return (
    <Modal centered width={360} open={isModal} onCancel={handleClose} footer={null}>
      <Form initialValues>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Photo">
          <Upload
            style={{ marginLeft: 100 }}
            accept="image/*"
            beforeUpload={() => false}
            // onChange={handleChange}
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
