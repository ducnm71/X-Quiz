import React, { useEffect, useState } from 'react';
import { Menu, Image, Button, Typography, Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import './style.css';
import Logo from '~/assets/imgs/logo.png';
import UserIcon from '~/components/User/UserIcon/index';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectProfile } from '~/redux/selectors';

function NavbarTop() {
  const { Header } = Layout;
  const navigate = useNavigate();
  const userProfile = useSelector(selectProfile);
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {}, [userProfile]);
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
      key: 'about',
      label: 'ABOUT',
      link: '/about',
    },
    {
      key: 'contact',
      label: 'CONTACT',
      link: '/contact',
    },
  ];

  const handleClick = () => {
    navigate('/room');
  };

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
        <>
          <Button type="primary" onClick={handleClick}>
            ROOM
          </Button>
          <UserIcon userProfile={userProfile} />
        </>
      )}
    </Header>
  );
}

export default NavbarTop;
