import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Image, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import './index.css';
import InRoomBackground from '~/assets/imgs/InRoomBackground.png';
import Avatar from '~/assets/imgs/Rectangle 278.png';
import JoinGameQR from '~/assets/imgs/JoinGameQR.png';
import { selectAccessToken } from '~/redux/selectors';
import { socket } from '~/utils/socketio';

function PlayPageAuth() {
  const [isHost, setIsHost] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const accessToken = useSelector(selectAccessToken);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      setIsHost(true);
    }
  });
  const data = location.state;
  const pin = data.pin;

  useEffect(() => {
    socket.emit('getroom', pin);
    socket.on('updatePlayers', (updatedPlayers) => setPlayers(updatedPlayers));
  }, []);

  const handleExit = () => {
    socket.emit('stopQuiz');
    socket.emit('score', (scoreRoom) => setScore(scoreRoom));
    navigate('/room');
  };

  const handleStart = () => {
    socket.emit('startQuiz', pin);
    socket.on('question', (question, questionIndex) => {
      setQuestions(question);
    });
    setIsQuizStarted(true);
  };

  const handleDisconnect = () => {
    socket.emit('clientDisconnect');
    socket.on('updatePlayers', (updatedPlayers) => setPlayers(updatedPlayers));
  };

  console.log('questionsssssss', questions);
  console.log('scoresssssss', score);
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
                onClick={handleStart}
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
              <Button
                onClick={handleExit}
                style={{
                  width: 110,
                  fontSize: 25,
                  fontWeight: 700,
                  height: 60,
                  padding: 8,
                  position: 'absolute',
                  right: '10px',
                }}
              >
                Exit
              </Button>
            </div>
            <div className="userInfor-container">
              <Image
                style={{
                  borderRadius: 10,
                }}
                width={160}
                src={Avatar}
                preview={false}
              />
              <div className="user-name">{data.name}</div>
              <div className="container-player">
                {players.map((item) => (
                  <div className="player">
                    <Image
                      style={{
                        borderRadius: 10,
                      }}
                      width={160}
                      src={Avatar}
                      preview={false}
                    />
                    <div>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="player-component">
              <div className="waiting-text">
                <i>Waiting for the host to start</i>
              </div>
              <Link to="/play">
                <Button
                  onClick={handleDisconnect}
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
            <div className="userInfor-container">
              {isQuizStarted === false ? (
                <div className="container-player">
                  {players.map((item) => (
                    <div className="player">
                      <Image
                        style={{
                          borderRadius: 10,
                        }}
                        width={160}
                        src={Avatar}
                        preview={false}
                      />
                      <div>{item.name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {questions.map((item) => (
                    <div>{item.description}</div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default PlayPageAuth;
