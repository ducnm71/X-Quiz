import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Image, Button } from 'antd';
import { useLocation } from 'react-router-dom';

import './index.css';
import InRoomBackground from '~/assets/imgs/InRoomBackground.png';
import Avatar from '~/assets/imgs/Rectangle 278.png';
import JoinGameQR from '~/assets/imgs/JoinGameQR.png';
import { selectAccessToken } from '~/redux/selectors';

function PlayPageAuth() {
  const [isHost, setIsHost] = useState(false);
  const accessToken = useSelector(selectAccessToken);
  const location = useLocation();
  useEffect(() => {
    if (accessToken) {
      setIsHost(true);
    }
  });
  const data = location.state;
  return (
    <React.Fragment>
      <div
        className="room-container"
        style={{
          backgroundImage: `url(${InRoomBackground})`,
        }}
      >
        {isHost ? (
          <>
            <div className="host-container">
              <div className="game-pin">
                <h4>Game PIN:</h4>
                <h1>{data.pin}</h1>
              </div>
              <Image src={JoinGameQR} width={135} />
              <Button
                style={{
                  position: 'absolute',
                  right: 50,
                  top: 280,
                  width: 110,
                  fontSize: 25,
                  fontWeight: 700,
                  height: 60,
                  padding: 8,
                }}
              >
                Start
              </Button>
              <Link to="/room">
                <Button
                  style={{
                    width: 110,
                    fontSize: 25,
                    fontWeight: 700,
                    height: 60,
                    padding: 8,
                    position: 'absolute',
                    right: '10px',
                    top: -50,
                  }}
                >
                  Exit
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="player-component">
              <div className="waiting-text">
                <i>Waiting for the host to start</i>
              </div>
              <Link to="/">
                <Button
                  style={{
                    width: 110,
                    fontSize: 25,
                    fontWeight: 700,
                    height: 60,
                    padding: 8,
                    position: 'absolute',
                    right: '50px',
                    top: -100,
                  }}
                >
                  Exit
                </Button>
              </Link>
            </div>
          </>
        )}
        <div className="userInfor-container">
          <Image
            style={{
              borderRadius: 10,
              marginBottom: '20px',
            }}
            width={160}
            src={Avatar}
            preview={false}
          />
          <div className="user-name">{data.name}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PlayPageAuth;
