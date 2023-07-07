import { Layout, Space, Menu } from 'antd';
import { MenuFoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Fragment } from 'react';

import withAuth from '~/redux/withAuth';

function HomePageAuth() {
  const { Sider, Content } = Layout;
  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
  };

  return (
    <Layout style={{ border: 'solid 1px #ccc' }}>
      <Sider style={siderStyle}>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              label: 'Quiz Room',
            },
            {
              key: '2',
              label: 'nav 2',
            },
            {
              key: '3',
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Content style={contentStyle}>Content</Content>
    </Layout>
  );
}

export default withAuth(true, HomePageAuth);
