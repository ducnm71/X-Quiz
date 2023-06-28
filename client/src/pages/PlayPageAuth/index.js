import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Image, Button, Radio } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import './index.css';
import InRoomBackground from '~/assets/imgs/InRoomBackground.png';
import Avatar from '~/assets/imgs/Rectangle 278.png';
import JoinGameQR from '~/assets/imgs/JoinGameQR.png';
import { selectAccessToken } from '~/redux/selectors';
import { socket } from '~/utils/socketio';

function PlayPageAuth() {
  const [isHost, setIsHost] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [radio, setRadio] = useState(0);
  const [isShow, setIsShow] = useState(false);

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

  const handleUpdatePlayers = (data) => {
    setPlayers(data);
  };

  // useEffect(() => {
  //   socket.emit('getroom', pin);
  // }, []);

  socket.on('updatePlayers', handleUpdatePlayers);

  const handleExit = () => {
    socket.emit('stopQuiz');
    socket.emit('score', (scoreRoom) => setScore(scoreRoom));
    navigate('/room');
  };

  const handleStart = () => {
    socket.emit('startQuiz', pin);
    setIsStarted(true);
  };

  const handleLeave = () => {
    socket.emit('leave');
  };

  const onChangeRadio = (e) => {
    console.log('radio checked', e.target.value);
    setRadio(e.target.value);
  };

  // const handleAnswer = () => {
  //   if (radio === 0) {
  //     socket.emit('answer', { selectedAnswerIndex: radio, qi: questionIndex });
  //     socket.on('answerResult', (result) => console.log(result));
  //   }
  // };

  socket.on('question', (data, index) => {
    setIsStarted(true);
    setQuestion(data);
    setRadio(data.options[0]);
    setQuestionIndex(index);
  });

  const handleShow = () => {
    socket.emit('getroom', pin);
    setIsShow(true);
  };

  // socket.emit('answer', radio);

  console.log(players);
  console.log(radio);
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
              {isStarted === false ? (
                <>
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
                    onClick={handleShow}
                    style={{
                      position: 'absolute',
                      right: 50,
                      top: 100,
                      width: 110,
                      fontSize: 25,
                      fontWeight: 700,
                      height: 60,
                      padding: 8,
                    }}
                  >
                    Show
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleExit}
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
                  Stop
                </Button>
              )}
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
              {isShow ? (
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
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="player-component">
              <Link to="/play">
                <Button
                  onClick={handleLeave}
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
              {isStarted === false ? (
                <>
                  <div className="waiting-text">
                    <i>Waiting for the host to start</i>
                  </div>

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
                </>
              ) : (
                <>
                  <div>{question.description}</div>
                  {question.options.map((item, index) => (
                    <Radio.Group onChange={onChangeRadio} key={index} value={radio}>
                      <Radio value={index + 1}>
                        {String.fromCharCode(65 + index)}: {item}
                      </Radio>
                    </Radio.Group>
                  ))}
                  {/* <Button onClick={handleAnswer}>Submit</Button>   */}
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
