import { Menu, Dropdown } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useValue } from '../../context/UserAuthContext';
import useCheckToken from '../../hooks/useCheckToken';
import Profile from '../Profile';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken();

  const {
    dispatch,
    state: { currentUser },
  } = useValue();

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case 'profile':
        dispatch({ type: 'UPDATE_PROFILE', payload: { open: true, file: null, photoURL: currentUser?.photoURL } });
        break;
      case 'logout':
        dispatch({ type: 'UPDATE_USER', payload: null });
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">
        <SettingOutlined />
        Profile
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} open={Boolean(anchorUserMenu)} onOpenChange={setAnchorUserMenu}>
        {currentUser && (
          <div>
            <Profile />
          </div>
        )}
      </Dropdown>
    </>
  );
};

export default UserMenu;
