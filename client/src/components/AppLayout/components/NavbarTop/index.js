import React from 'react';
import { Menu, Image, Button } from 'antd';
import { Link } from 'react-router-dom';

import Logo from '../../../../assets/imgs/logo.png';
function NavbarTop() {
  const items = [
    {
      key: 'home',
      label: 'Home',
      link: '/',
    },
    {
      key: 'play',
      label: 'Play',
      link: '/play',
    },
    {
      key: 'room',
      label: 'Room',
      link: '/room',
    },
    {
      key: 'about',
      label: 'About',
      link: '/about',
    },
  ];

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >

        <Link to="/">
          <Image style={{ borderRadius: 10 }} width={60} src={Logo} />
          Quiz
        </Link>
        <Menu
          mode="horizontal"
          style={{ color: '#4F5665', fontSize: 24, fontWeight: 700, height: '10vh', paddingTop: '1vh' }}
        >
          {items.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <Button type="primary" shape="round">
          <Link to="/signin"> Sign In </Link>
        </Button>
      </div>
    </React.Fragment>
  );
}

export default NavbarTop;
