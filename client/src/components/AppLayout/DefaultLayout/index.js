import { Layout, Space } from 'antd';

import './style.css';
import NavbarTop from '../components/NavbarTop';
import EndOfPage from '../components/EndOfPage';

function DefaultLayout({ children }) {
  const { Content } = Layout;
  return (
    <Space className="container" direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <NavbarTop />
        <Content style={{ height: '100%', backgroundColor: '#fff' }}>{children}</Content>
        <EndOfPage />
      </Layout>
    </Space>
  );
}

export default DefaultLayout;
