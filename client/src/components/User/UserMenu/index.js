import { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import Profile from '../../Profile';
import { logout } from '~/redux/actions';

const UserMenu = ({ userProfile, anchorUserMenu, setAnchorUserMenu }) => {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch(logout());
    } else if (key === 'profile') {
      setIsModal(true);
    }
    setAnchorUserMenu(null);
  };

  const handleClose = () => {
    setIsModal(false);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">
        <SettingOutlined style={{ marginRight: 10 }} />
        Profile
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined style={{ marginRight: 10 }} />
        Logout
      </Menu.Item>
    </Menu>
  );
  // const items = [
  //   {
  //     key: '1',
  //     label: (
  //       <>
  //         <SettingOutlined style={{ marginRight: 10 }} />
  //         Profile
  //       </>
  //     ),
  //   },
  //   {
  //     key: '2',
  //     label: (
  //       <>
  //         <LogoutOutlined style={{ marginRight: 10 }} />
  //         Logout
  //       </>
  //     ),
  //   },
  // ];

  return (
    <>
      <Dropdown overlay={menu} open={Boolean(anchorUserMenu)} onOpenChange={setAnchorUserMenu}>
        {userProfile && (
          <div>
            <Profile isModal={isModal} userProfile={userProfile} handleClose={handleClose} />
          </div>
        )}
      </Dropdown>
    </>
  );
};

export default UserMenu;
