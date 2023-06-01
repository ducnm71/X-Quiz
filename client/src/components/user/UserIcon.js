import { Avatar, Button, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Fragment, useState } from 'react';

import UserMenu from './UserMenu';

const UserIcon = ({ userProfile }) => {
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);

  return (
    <>
      {userProfile && (
        <Fragment>
          <Tooltip placement="left" title=" Settings">
            <Button style={{ border: 'none', height: 69 }} onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
              <Avatar size={60} src={userProfile?.photoURL} alt={userProfile?.name} icon={<UserOutlined />} />
            </Button>
          </Tooltip>
          <UserMenu userProfile={userProfile} anchorUserMenu={anchorUserMenu} setAnchorUserMenu={setAnchorUserMenu} />
        </Fragment>
      )}
    </>
  );
};

export default UserIcon;
