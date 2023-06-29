import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Image, Button, Radio, Row, Col, Typography } from 'antd';
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

  const data = location.state;

  useEffect(() => {
    socket.on('updatePlayers', (player) => setPlayers(player));
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
  }, [players]);

  const handleLeave = () => {
    socket.emit('leave');
    navigate('/play');
  };

  socket.on('question', (data, index) => {
    setQuestion(data);
    setIndexQuestion(index);
  });

  console.log(players);
  console.log(question);

  return (
    <div
      className="player-container"
      style={{
        backgroundImage: `url(${InRoomBackground})`,
      }}
    >
      <Row style={{ marginBottom: 30 }}>
        <Col offset={8} span={8}>
          <Title style={{ color: 'white', marginTop: 100 }}>Waiting for the host to start</Title>
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
    </div>
  );
}

export default PlayerRoomPage;
