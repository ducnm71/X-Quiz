import { HeaderOnly, DefaultLayout } from '~/components/AppLayout';

import HomePage from '~/pages/HomePage';
import HomePageAuth from '~/pages/HomePageAuth';
import SignInPage from '~/pages/SignInPage';
import EnterPIN from '~/pages/EnterPIN';
import JoinGame from '~/pages/JoinGame';
import RoomPage from '~/pages/RoomPage';
import AboutPage from '~/pages/AboutPage';
import ContactPage from '~/pages/ContactPage';
import SignUpPage from '~/pages/SignUpPage';
import QuestionPage from '~/pages/QuestionPage';
import PlayPageAuth from '~/pages/PlayPageAuth';

const publicRoutes = [
  { path: '/', component: HomePage, layout: DefaultLayout, title: 'Home' },
  { path: '/play', component: EnterPIN, layout: null, title: 'Enter Game PIN' },
  { path: '/start', component: PlayPageAuth, layout: null, title: 'Enter Game PIN' },
  { path: '/join', component: JoinGame, layout: null, title: 'Join Game' },
  { path: '/room', component: RoomPage, layout: DefaultLayout, title: 'Room' },
  { path: '/:id/:name/question', component: QuestionPage, layout: DefaultLayout, title: 'Question' },
  { path: '/about', component: AboutPage, layout: DefaultLayout, title: 'About Page' },
  { path: '/contact', component: ContactPage, layout: DefaultLayout, title: 'Contact Page' },
  { path: '/signin', component: SignInPage, layout: null, title: 'Sign' },
  { path: '/signup', component: SignUpPage, layout: null, title: 'Sign Up' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
