import React from 'react';
import { Image, Input, Button } from 'antd';

import './index.css';
import EnterBackground from '~/assets/imgs/Enter.jpg';
import logo from '~/assets/imgs/logo.png';

const JoinGame = () => {
  console.log(EnterBackground);
  return (
    <React.Fragment>
      <div
        className="play-container"
        style={{
          backgroundImage: `url(${EnterBackground})`,
        }}
      >
        <Image
          style={{
            borderRadius: 10,
            marginBottom: '20px',
          }}
          width={100}
          src={logo}
          preview={false}
        />
        <div className="name-input-container">
          <Input
            placeholder={'Nickname'}
            style={{
              marginBottom: '10px',
              height: '50px',
              fontWeight: '700',
              fontSize: '18px',
            }}
          />
          <Button
            style={{
              width: '100%',
              backgroundColor: 'rgb(51, 51, 51)',
              color: 'white',
              height: '50px',
              fontSize: '20px',
            }}
          >
            Ok, go!
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JoinGame;
