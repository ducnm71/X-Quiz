import React from 'react';
import { Menu, Image, Button, Typography, Layout } from 'antd';
import { Link } from 'react-router-dom';

import './style.css';
import Logo from '../../../../assets/imgs/logo.png';
import UserIcon from '../../../user/UserIcon';
import { useSelector } from 'react-redux';
import useCheckToken from '../../../../hooks/useCheckToken';
import { selectAccessToken, selectProfile } from '../../../../redux/selectors';

function NavbarTop() {
  const { Header } = Layout;
  useCheckToken();
  const accessToken = useSelector(selectAccessToken);
  const userProfile = useSelector(selectProfile);

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
    <Header className="nav">
      <div className="logo-nav">
        <Image style={{ borderRadius: 10 }} width={60} src={Logo} preview={false} />
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
      {!accessToken ? (
        <Button className="btn-nav" type="primary" shape="round">
          <Link to="/signin"> Sign In </Link>
        </Button>
      ) : (
        <UserIcon userProfile={userProfile} />
      )}
    </Header>
  );
}

export default NavbarTop;
