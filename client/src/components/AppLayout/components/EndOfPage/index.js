import { Layout } from 'antd';
import { FacebookOutlined, TwitterOutlined, GithubOutlined, UserAddOutlined } from '@ant-design/icons';

import './style.css';

function EndOfPage() {
  const { Footer } = Layout;

  const handleLinkClick = (url) => {
    window.open(url);
  };
  return (
    <Footer id="endOfPage" style={{ textAlign: 'center', borderTop: '1px solid #ccc' }}>
      <div>
        <FacebookOutlined
          className="customIcon"
          style={{ color: '#4267b2' }}
          onClick={() => handleLinkClick('https://www.facebook.com')}
        />
        <TwitterOutlined
          className="customIcon"
          style={{ color: '#1DA1F2' }}
          onClick={() => handleLinkClick('https://www.twitter.com')}
        />
        <GithubOutlined
          className="customIcon"
          style={{ color: '#211f1f' }}
          onClick={() => handleLinkClick('https://www.github.com')}
        />
      </div>
      <div>Quiz &copy; {new Date().getFullYear()}</div>
    </Footer>
  );
}

export default EndOfPage;
