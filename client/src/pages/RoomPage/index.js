import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Button, Typography, Layout, Input, Col, Row, Space, Upload, Avatar, Form, Radio } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import './style.css';
import Logo from '~/assets/imgs/logo.png';
import Bg from '~/assets/imgs/InRoomBackground.png';
import Question from '~/components/Question/index';

const RoomPage = () => {
  const { Header, Content, Sider } = Layout;

  const [valueRadio, setValueRadio] = useState('');
  const [questions, setQuestions] = useState([{ id: 1 }]);

  const onChangeRadio = (e) => {
    setValueRadio(e.target.value);
  };

  const handleAddQuestion = () => {
    const newQuestionId = questions.length + 1;
    const newQuestion = { id: newQuestionId };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter((question) => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  const questionList = questions.map((question) => (
    <Question handleDeleteQuestion={handleDeleteQuestion} index={question.id} />
  ));

  const contentStyle = {
    position: 'relative',
  };
  const siderStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#fff',
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Layout className="container-room">
      <Header className="nav-room">
        <Row gutter={[8, 8]}>
          <Col className="logo-nav-room" span={4}>
            <Image style={{ borderRadius: 10 }} width={60} src={Logo} preview={false} />
            {/* <Input style={{ marginLeft: 10 }} /> */}
          </Col>
          <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} span={12} offset={8}>
            <Space span={10}>
              <Button size="large" type="primary">
                Save
              </Button>
              <Button size="large">
                <Link to="/">Exit</Link>
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>
      <Content style={{ textAlign: 'center', marginBottom: 50 }}>
        <Typography.Title>Quiz Question</Typography.Title>
        <div style={{ marginLeft: 40 }}>
          <Form.Item
            style={{ display: 'flex' }}
            rules={[
              {
                type: 'name',
                message: 'Please enter valid email',
              },
            ]}
            label={<span>Room Name</span>}
            name="name"
          >
            <Input placeholder="" />
          </Form.Item>
          <Form style={{ marginTop: 20, marginBottom: 20 }}>
            {questionList}
            <Button style={{ marginBottom: 20, float: 'left' }} onClick={handleAddQuestion}>
              Add Question
            </Button>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default RoomPage;

{
  /* <Layout hasSider>
<Sider style={siderStyle}>
  {questions.map((question) => (
    <div
      key={question.id}
      style={{
        border: '1px solid #ccc',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Typography.Title level={3}>Question {question.id}</Typography.Title>
      {question.id > 0 && (
        <DeleteOutlined
          onClick={() => handleDeleteQuestion(question.id)}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            color: 'black',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  ))}
  <Button style={{ marginTop: 10 }} onClick={handleAddQuestion}>
    Add question
  </Button>
</Sider>
<Content style={contentStyle}>
  <div style={{ backgroundImage: `url(${Bg})`, display: 'flex', justifyContent: 'center', height: '100%' }}>
    <Form
      style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', top: 30 }}
    >
      <Input style={{ width: 600, marginBottom: 40 }} size="large" placeholder="Start typing your question" />
      <Upload
        accept="image/*"
        // beforeUpload={() => false}
        listType="picture-card"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        // onChange={handleChange}
        // showUploadList={false}
        maxCount={0}
      >
        {uploadButton}
      </Upload>
      <Row style={{ marginTop: 40 }}>
        <Col style={{ marginRight: 20 }}>
          <Input
            size="large"
            style={{ marginBottom: 20 }}
            addonBefore={
              <Radio.Group onChange={onChangeRadio} value={valueRadio}>
                <Radio value="A">A</Radio>
              </Radio.Group>
            }
          />
          <Input
            size="large"
            addonBefore={
              <Radio.Group onChange={onChangeRadio} value={valueRadio}>
                <Radio value="C">C</Radio>
              </Radio.Group>
            }
          />
        </Col>
        <Col>
          <Input
            size="large"
            style={{ marginBottom: 20 }}
            addonBefore={
              <Radio.Group onChange={onChangeRadio} value={valueRadio}>
                <Radio value="B">B</Radio>
              </Radio.Group>
            }
          />
          <Input
            size="large"
            addonBefore={
              <Radio.Group onChange={onChangeRadio} value={valueRadio}>
                <Radio value="D">D</Radio>
              </Radio.Group>
            }
          />
        </Col>
      </Row>
    </Form>
  </div>
</Content>
</Layout> */
}
