import { Layout, List, Typography } from 'antd';
import { FacebookOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './style.css';

function EndOfPage() {
  const { Footer } = Layout;

  const handleLinkClick = (url) => {
    window.open(url);
  };
  return (
    <Footer style={{ borderTop: '1px solid #ccc' }}>
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li>
                <Link to="/">Company</Link>
              </li>
              <li>
                <Link to="/">Service</Link>
              </li>
              <li>
                <Link to="/">Blog</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Application</h4>
            <ul>
              <li>
                <Link to="/">At home</Link>
              </li>
              <li>
                <Link to="/">At school</Link>
              </li>
              <li>
                <Link to="/">At work</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Terms and conditions</h4>
            <ul>
              <li>
                <Link to="/">Terms and conditions</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Follow us</h4>
            <div className="footer-social-links">
              <FacebookOutlined
                onClick={() => handleLinkClick('https://www.facebook.com')}
                style={{ color: '#4267b2' }}
              />
              <GithubOutlined
                onClick={() => handleLinkClick('https://www.github.com')}
                style={{ color: '#211f1f', marginRight: 20, marginLeft: 20 }}
              />
              <GoogleOutlined onClick={() => handleLinkClick('https://www.google.com')} style={{ color: '#db4437' }} />
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default EndOfPage;
