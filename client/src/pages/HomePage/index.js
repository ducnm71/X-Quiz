import {
  Carousel,
  Button,
  Input,
  Form,
  Typography,
  Col,
  Row,
} from 'antd';

import './index.css';
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <React.Fragment>
      <Carousel waitForAnimate dots={false} autoplay effect="fade" className="homepage--slide">
        <div className="homepage--slide-1 mySlide appear"></div>
        <div className="homepage--slide-2 mySlide"></div>
        <div className="homepage--slide-3 mySlide"></div>
      </Carousel>
      <Row
        className='home-form-container'
      >
        <Col
          span={12}
          className='home--description'
        >
          <Typography.Title
            style={{
              color: "white",
              fontSize: 50,
              wordSpacing: -3,
            }}
            className='home--desc__title'
          >
            <span
              style={{
                color: "#f86e2f"
              }}>
              X-Quizz
            </span> {""}
            is a smart choice for school, friends and family.
          </Typography.Title>
          <Typography.Text
            className='home--desc__subtitle'
          >
            What is X-Quizz!? X-Quizz! is a game-based learning platform that makes it easy to create,
            share and play learning games or trivia quizzes in minutes.
            Unleash the fun in classrooms, offices and living rooms!
          </Typography.Text>
          <br />
          <div>
            <Button
              type={"primary"}
              className='home--desc__btn'
              size={'large'}
            >
              Create Room
            </Button>
            <Button
              type={"transparent"}
              size={'large'}
              style={{
                borderColor: "white",
                borderWidth: 2
              }}
              className='home--desc__btn'
            >
              Play
            </Button>
          </div>
        </Col>

        <Col
          span={12}
          className='home--signUpForm-container'
        >
          <Form
            className='home--signUpForm'
            size={'large'}
            layout="vertical"
            style={{
              height: 'fit-content'
            }}
          >
            <Typography.Title
              className='home--signUpForm-title'
            >
              Sign Up to create your free Game
            </Typography.Title>
            <Form.Item>
              <Input
                placeHolder={'First name'}
                className='home--signUpForm__input'
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeHolder={'Last name'}
                className='home--signUpForm__input'
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeHolder={'Email address'}
                className='home--signUpForm__input'
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeHolder={'Phone number'}
                className='home--signUpForm__input'
              />
            </Form.Item>
            <Button className='home--signUpForm__btn'>
              Sign Up Now
            </Button>
            <br />
            <Typography.Text className='home--signUpForm__privacy'>
              Your information will not be shared with anyone {" "}
              <Link>(See Privacy policy)</Link>
            </Typography.Text>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default HomePage;
