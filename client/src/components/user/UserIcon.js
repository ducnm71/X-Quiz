import { Avatar, Button, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import useCheckToken from '../../hooks/useCheckToken';
import UserMenu from './UserMenu';

const UserIcon = () => {
  useCheckToken();

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);

  return (
    <div>
      {null && (
        <Tooltip placement="left" title=" Settings">
          <Button style={{ border: 'none', height: 69 }} onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
            <Avatar size={60} src alt icon={<UserOutlined />} />
          </Button>
        </Tooltip>
      )}
      <UserMenu anchorUserMenu={anchorUserMenu} setAnchorUserMenu={setAnchorUserMenu} />
    </div>
  );
};

export default UserIcon;
