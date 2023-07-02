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
  const [score, setScore] = useState([]);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { Title } = Typography;

  const data = location.state;
  const pin = data.pin;

  useEffect(() => {
    socket.emit('getroom', pin);
    socket.on('updatePlayers', handleUpdatePlayers);
    return () => {
      socket.off('question', handleQuestion);
    };
  }, []);

  useEffect(() => {
    if (score.length > 0 && score.length === playerRoom.length) {
      setIsQuestionAnswered(true);
    } else {
      setIsQuestionAnswered(false);
    }
  }, [score, playerRoom]);

  const handleUpdatePlayers = (data) => {
    setPlayerRoom(data);
  };

  const handleQuestion = (value, index) => {
    setQuestion((prevQuestion) => ({ ...prevQuestion, ...value }));
    setQuestionIndex(index);
    setIsStarted(true);
  };

  const handleScore = (result) => {
    setScore(result);
  };

  const handleExit = () => {
    socket.emit('stopQuiz');
    socket.emit('score', handleScore);
    navigate('/room');
  };

  const handleStart = () => {
    socket.emit('startQuiz', pin);
    socket.on('question', handleQuestion);
  };

  const handleStop = () => {
    setIsStarted(false);
    socket.emit('stopQuiz');
    socket.on('score', handleScore);
    setIsQuestionAnswered(false);
  };

  console.log(isQuestionAnswered);

  return (
    <React.Fragment>
      <div
        className="room-container"
        style={{
          backgroundImage: `url(${InRoomBackground})`,
        }}
      >
        <Row style={{ marginTop: 30, justifyContent: 'center', marginBottom: 30 }}>
          {isStarted === false ? (
            <>
              <Row className="game-pin">
                <Typography.Title level={4}>Game PIN:</Typography.Title>
                <Typography.Title style={{ marginTop: 0 }} level={1}>
                  {data.pin}
                </Typography.Title>
              </Row>
              <Image src={JoinGameQR} width={135} />
              <Row>
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
                width: 110,
                fontSize: 25,
                fontWeight: 700,
                height: 60,
                padding: 8,
                color: 'red',
                backgroundColor: 'black',
              }}
            >
              Stop
            </Button>
          )}
        </Row>
        {Object.keys(question).length >= 0 && isStarted === false ? (
          <Row style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Title level={1} style={{ color: '#fff' }}>
              Room: {data.name}
            </Title>
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
          </Row>
        ) : isQuestionAnswered ? (
          <Row>
            <Col span={24}>
              <Title level={3} style={{ color: 'white', marginTop: 20 }}>
                Scores:
              </Title>
              <Row>
                {score.map((playerScore) => (
                  <Col span={4} className="player">
                    <Image
                      style={{
                        borderRadius: 10,
                      }}
                      width={160}
                      src={Avatar}
                      preview={false}
                    />
                    <Title level={3} style={{ color: data.name === playerScore.name ? 'rgb(226, 27, 60)' : 'inherit' }}>
                      {playerScore.name}: {playerScore.score}
                    </Title>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        ) : (
          <>
            <Row style={{ color: 'white', justifyContent: 'center' }}>
              <Title style={{ color: 'white', marginTop: 100 }}>Question {questionIndex + 1}: </Title>
              <Title style={{ marginLeft: 20, marginTop: 100 }}> {question.description}</Title>
            </Row>

            <Row style={{ margin: 30, marginTop: 100 }}>
              <Col span={12} style={{ padding: 30 }}>
                {question.options.slice(0, 2).map((option, index) => (
                  <Title
                    className={`title-question-${index}`}
                    key={index}
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: 20,
                    }}
                  >
                    <span style={{ color: '#fff' }}>{String.fromCharCode(65 + index)}:</span> {option}
                  </Title>
                ))}
              </Col>
              <Col span={12} style={{ padding: 30 }}>
                {question.options.slice(2, 4).map((option, index) => (
                  <Title
                    className={`title-question-${index + 2}`}
                    key={index + 2}
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: 20,
                    }}
                  >
                    <span style={{ color: '#fff' }}>{String.fromCharCode(67 + index)}:</span> {option}
                  </Title>
                ))}
              </Col>
            </Row>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default PlayPageAuth;
