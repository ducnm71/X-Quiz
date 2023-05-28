import { Col, Row, Typography, Image } from 'antd';

import './style.css';
import ImageAbout from '../../assets/imgs/logo.png';

function AboutPage() {
  const { Title, Paragraph } = Typography;
  return (
    <Row style={{ margin: 80 }} gutter={[0, 0]}>
      <Col span={12}>
        <Image width={500} src={ImageAbout} preview={false} />
      </Col>
      <Col span={12}>
        <Title level={'h1'} style={{ margin: '0' }}>
          Welcome to our team's web quiz!
        </Title>
        <br />
        <Paragraph strong style={{ fontSize: 16, textAlign: 'justify' }}>
          Our website has been designed to provide an enjoyable gaming experience where players can create and share
          questions with each other using a unique PIN code. We aim to deliver a website that brings joy and excitement
          to you and all participants.
          <br />
          <br />
          At our website, you can join existing games by entering a unique PIN code. You also have the ability to create
          your own game and share the PIN code with friends or others you wish to challenge. This allows you to create
          unique games tailored to your preferences.
          <br />
          <br />
          We have put a lot of effort into creating an engaging gaming environment with a user-friendly interface. We
          hope that our website will provide you with hours of fun and serve as a platform for meeting and interacting
          with players from all over.
          <br />
          <br />
          Your feedback is always valuable to us as we continuously strive to improve the user experience and deliver
          the best games possible.
        </Paragraph>
        <Paragraph strong style={{ fontSize: 16, textAlign: 'justify' }}>
          Join us now and start playing!
        </Paragraph>
      </Col>
    </Row>
  );
}

export default AboutPage;
