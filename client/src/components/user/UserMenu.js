import { Menu, Dropdown } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import useCheckToken from '../../hooks/useCheckToken';
import Profile from '../Profile';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken();

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const handleMenuClick = ({ key }) => {
    handleCloseUserMenu();
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

  return (
    <>
      <Dropdown overlay={menu} open={Boolean(anchorUserMenu)} onOpenChange={setAnchorUserMenu}>
        {null && (
          <div>
            <Profile />
          </div>
        )}
      </Dropdown>
    </>
  );
};

export default UserMenu;
