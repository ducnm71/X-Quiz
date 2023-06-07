import React from 'react';
import { Modal, Form, Input, Button, Upload, Avatar } from 'antd';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';

const Profile = ({ userProfile, isModal, handleClose }) => {
  // const handleChange = (info) => {};

  return (
    <Modal centered width={360} open={isModal} onCancel={handleClose} footer={null}>
      <Form initialValues={userProfile}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Profile Photo">
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            // onChange={handleChange}
            showUploadList={false}
            maxCount={1}
          >
            <Avatar style={{ marginLeft: 30 }} size={100} src={userProfile.photoURL} icon={<UploadOutlined />} />
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Profile;
