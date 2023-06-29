import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Image, Button, Radio, Row, Col, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import './index.css';
import InRoomBackground from '~/assets/imgs/InRoomBackground.png';
import Avatar from '~/assets/imgs/Rectangle 278.png';
import JoinGameQR from '~/assets/imgs/JoinGameQR.png';
import { selectAccessToken } from '~/redux/selectors';
import { socket } from '~/utils/socketio';

function PlayPageAuth() {
  const [isStarted, setIsStarted] = useState(false);
  const [playerRoom, setPlayerRoom] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;
  const pin = data.pin;

  socket.on('question', (dataQuestion, index) => {
    setQuestion(dataQuestion);
    setQuestionIndex(index);
  });

  const handleExit = () => {
    // socket.emit('stopQuiz');
    // socket.emit('score', (scoreRoom) => setScore(scoreRoom));
    navigate('/room');
  };

  const handleStart = () => {
    socket.emit('startQuiz', pin);

    setIsStarted(true);
  };

  const handleStop = () => {
    setIsStarted(false);
  };

  // const handleAnswer = () => {
  //   if (radio === 0) {
  //     socket.emit('answer', { selectedAnswerIndex: radio, qi: questionIndex });
  //     socket.on('answerResult', (result) => console.log(result));
  //   }
  // };

  const handleShow = () => {
    if (isShow === true) {
      setIsShow(false);
    } else {
      socket.emit('getroom', pin);
      socket.on('updatePlayers', (data) => setPlayerRoom(data));
      setIsShow(true);
    }
  };

  console.log(question);

  // socket.emit('answer', radio);

  return (
    <React.Fragment>
      <div
        className="room-container"
        style={{
          backgroundImage: `url(${InRoomBackground})`,
        }}
      >
        <Row style={{ marginTop: 30, justifyContent: 'center', marginBottom: 30 }}>
          <Row className="game-pin">
            <Typography.Title level={4}>Game PIN:</Typography.Title>
            <Typography.Title style={{ marginTop: 0 }} level={1}>
              {data.pin}
            </Typography.Title>
          </Row>
          <Image src={JoinGameQR} width={135} />
          {isStarted === false ? (
            <>
              <Row>
                <Button
                  onClick={handleShow}
                  style={{
                    position: 'absolute',
                    right: 10,
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
                <Button
                  onClick={handleExit}
                  style={{
                    width: 110,
                    fontSize: 25,
                    fontWeight: 700,
                    height: 60,
                    padding: 8,
                    position: 'absolute',
                    right: 10,
                  }}
                >
                  Exit
                </Button>
              </Row>

              <Button
                onClick={handleStart}
                style={{
                  position: 'absolute',
                  right: 10,
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
            </>
          ) : (
            <Button
              onClick={handleStop}
              style={{
                position: 'absolute',
                right: 50,
                top: 280,
                width: 110,
                fontSize: 25,
                fontWeight: 700,
                height: 60,
                padding: 8,
                color: 'red',
              }}
            >
              Stop
            </Button>
          )}
        </Row>
        <div className="userInfor-container">
          <Typography.Title level={1} style={{ color: '#fff' }}>
            Room: {data.name}
          </Typography.Title>
          {isShow ? (
            <div className="container-player">
              {playerRoom.map((item) => (
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
      </div>
    </React.Fragment>
  );
}

export default PlayPageAuth;
