import React, { useEffect, useState } from 'react';
import { Image, Button, Row, Col, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import './index.css';
import InRoomBackground from '~/assets/imgs/InRoomBackground.png';
import Avatar from '~/assets/imgs/Rectangle 278.png';
import { socket } from '~/utils/socketio';

function PlayerRoomPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { Title } = Typography;

  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState({});
  const [indexQuestion, setIndexQuestion] = useState();
  const [isStarted, setIsStarted] = useState(false);
  const [answer, setAnswer] = useState(0);
  const [score, setScore] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);

  const data = location.state;

  useEffect(() => {
    socket.on('answerResult', handleAnswer);
    socket.on('score', handleScore);
    socket.on('question', handleQuestion);
    socket.on('updatePlayers', handlePlayer);

    const isRefreshed = sessionStorage.getItem('isRefreshed');
    if (isRefreshed) {
      socket.emit('leave');
      navigate('/play');
    } else {
      sessionStorage.setItem('isRefreshed', true);
    }
    return () => {
      sessionStorage.removeItem('isRefreshed');
    };
  }, []);

  useEffect(() => {
    if (score.length > 0 && score.length === players.length) {
      setIsQuestionAnswered(true);
    } else {
      setIsQuestionAnswered(false);
    }
  }, [score, players]);

  const handleScore = (value) => setScore(value);

  const handleQuestion = (value, index) => {
    setQuestion((prevQuestion) => ({ ...prevQuestion, ...value }));
    setIndexQuestion(index);
    setIsStarted(true);
  };

  const handleAnswer = (value) => {
    setAnswer(value);
  };

  const handlePlayer = (value) => setPlayers(value);

  const handleClick = (value) => {
    socket.emit('answer', { selectedAnswerIndex: value, qi: indexQuestion });
  };

  const handleLeave = () => {
    socket.emit('leave');
    navigate('/play');
  };

  console.log('answer', answer);

  console.log('socre', score);
  return (
    <div
      className="player-container"
      style={{
        backgroundImage: `url(${InRoomBackground})`,
      }}
    >
      <Title>{timer}</Title>
      <Row style={{ marginBottom: 30 }}>
        <Col offset={8} span={8}>
          {Object.keys(question).length === 0 ? (
            <Title style={{ color: 'white', marginTop: 100 }}>Waiting for the host to start</Title>
          ) : (
            <Row>
              <Title style={{ color: 'white', marginTop: 100 }}>Question {indexQuestion + 1}: </Title>
              <Title style={{ marginLeft: 20, marginTop: 100 }}> {question.description}</Title>
            </Row>
          )}
        </Col>
        <Col offset={4} style={{ marginTop: 30 }}>
          <Button
            onClick={handleLeave}
            style={{
              width: 110,
              fontSize: 25,
              fontWeight: 700,
              height: 60,
              padding: 8,
            }}
          >
            Exit
          </Button>
        </Col>
      </Row>
      {Object.keys(question).length === 0 ? (
        <Row>
          {players.map((item) => (
            <Col span={4} className="player">
              <Image
                style={{
                  borderRadius: 10,
                }}
                width={160}
                src={Avatar}
                preview={false}
              />
              <Title level={3} style={{ color: data.name === item.name ? 'rgb(226, 27, 60)' : 'inherit' }}>
                {item.name}
              </Title>
            </Col>
          ))}
        </Row>
      ) : isQuestionAnswered ? (
        <Row>
          <Col span={24}>
            <Title level={3} style={{ color: 'white', marginTop: 20 }}>
              Scores:
            </Title>
            <Row>
              {score
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map((playerScore) => (
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
        <Row>
          <Col span={12} style={{ padding: 30 }}>
            {question.options.slice(0, 2).map((option, index) => (
              <Title
                onClick={() => handleClick(index + 1)}
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
                onClick={() => handleClick(index + 3)}
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
      )}
    </div>
  );
}

export default PlayerRoomPage;
