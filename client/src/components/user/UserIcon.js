import { Avatar, Button, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import useCheckToken from '../../hooks/useCheckToken';
import UserMenu from './UserMenu';

const UserIcon = () => {
  useCheckToken();
  const userProfile = useSelector((state) => state.profile);
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);

  return (
    <div>
      {userProfile && (
        <Tooltip placement="left" title=" Settings">
          <Button style={{ border: 'none', height: 69 }} onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
            <Avatar size={60} src={userProfile?.photoURL} alt={userProfile?.name} icon={<UserOutlined />} />
          </Button>
        </Tooltip>
      )}
      <UserMenu anchorUserMenu={anchorUserMenu} setAnchorUserMenu={setAnchorUserMenu} />
    </div>
  );
};

export default UserIcon;
