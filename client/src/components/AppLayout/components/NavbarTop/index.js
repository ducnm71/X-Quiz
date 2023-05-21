import React from 'react';
import { Menu, Image, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

import './index.css';

import Logo from '../../../../assets/imgs/logo.png';
function NavbarTop() {
  const items = [
    {
      key: 'home',
      label: 'HOME',
      link: '/',
    },
    {
      key: 'play',
      label: 'PLAY',
      link: '/play',
    },
    {
      key: 'room',
      label: 'ROOM',
      link: '/room',
    },
    {
      key: 'about',
      label: 'ABOUT',
      link: '/about',
    },
  ];

  return (
    <React.Fragment>
      <div className="nav">
        <div className="logo-nav">
          <Image style={{ borderRadius: 10 }} width={60} src={Logo} />
          <Link to="/">
            <Typography.Title>Quiz</Typography.Title>
          </Link>
        </div>
        <Menu mode="horizontal" className="menu-nav">
          {items.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <Button className="btn-nav" type="primary" shape="round">
          <Link to="/signin"> Sign In </Link>
        </Button>
      </div>
    </React.Fragment>
  );
}

export default NavbarTop;
