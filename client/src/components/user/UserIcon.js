import { Avatar, Button, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useValue } from '../../context/UserAuthContext';
import useCheckToken from '../../hooks/useCheckToken';
import UserMenu from './UserMenu';

const UserIcon = () => {
  useCheckToken();
  const {
    state: { currentUser },
  } = useValue();

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);

  return (
    <div>
      {currentUser && (
        <Tooltip placement="left" title=" Settings">
          <Button style={{ border: 'none', height: 69 }} onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
            <Avatar size={60} src={currentUser?.photoURL} alt={currentUser?.name} icon={<UserOutlined />} />
          </Button>
        </Tooltip>
      )}
      <UserMenu anchorUserMenu={anchorUserMenu} setAnchorUserMenu={setAnchorUserMenu} />
    </div>
  );
};

export default UserIcon;
