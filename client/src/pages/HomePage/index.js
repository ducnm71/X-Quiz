import { Carousel, Button, Input } from 'antd';

import './index.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '~/redux/withAuth';

const HomePage = () => {
  // const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Carousel waitForAnimate dots={false} autoplay effect="fade" className="homepage--slide">
        <div className="homepage--slide-1 mySlide appear"></div>
        <div className="homepage--slide-2 mySlide"></div>
        <div className="homepage--slide-3 mySlide"></div>
      </Carousel>
      <div className="home-form-container">
        <div className="home--description">
          <h1 className="home--desc__title">
            <span
              style={{
                color: '#f86e2f',
              }}
            >
              X-Quizz
            </span>{' '}
            {''}
            is a smart choice for school, friends and family.
          </h1>
          <p className="home--desc__subtitle">
            What is X-Quizz!? X-Quizz! is a game-based learning platform that makes it easy to create, share and play
            learning games or trivia quizzes in minutes. Unleash the fun in classrooms, offices and living rooms!
          </p>
          <Button type={'primary'} className="home--desc__btn">
            Create Room
          </Button>
          <Button
            type={'transparent'}
            style={{
              borderColor: 'white',
              borderWidth: 2,
            }}
            className="home--desc__btn"
          >
            Play
          </Button>
        </div>

        <div className="home--signUpForm-container">
          <div className="home--signUpForm">
            <h1 className="home--signUpForm-title">Sign Up to create your free Game</h1>
            <div className="home--signUpForm__warningText">All fields are required*</div>
            <Input placeHolder={'Name'} className="home--signUpForm__input" />
            <Input placeHolder={'Email'} className="home--signUpForm__input" />
            <Input placeHolder={'Password'} className="home--signUpForm__input" />
            <Input placeHolder={'Confirm Password'} className="home--signUpForm__input" />
            <Button className="home--signUpForm__btn">Sign Up Now</Button>
            <div className="home--signUpForm__privacy">
              Your information will not be shared with anyone <Link>(See Privacy policy)</Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withAuth(false, HomePage);
