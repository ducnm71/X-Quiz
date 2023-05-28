import { Layout, Space } from 'antd';

import NavbarTop from '../components/NavbarTop';

function HeaderOnly({ children }) {
  const { Content } = Layout;
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <NavbarTop />
        <Content>{children}</Content>
      </Layout>
    </Space>
  );
}

export default HeaderOnly;
