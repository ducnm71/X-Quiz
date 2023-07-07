import { HeaderOnly, DefaultLayout } from '~/components/AppLayout';

import HomePage from '~/pages/HomePage';
import SignInPage from '~/pages/SignInPage';
import EnterPIN from '~/pages/EnterPIN';
import JoinGame from '~/pages/JoinGame';
import RoomPage from '~/pages/RoomPage';
import AboutPage from '~/pages/AboutPage';
import ContactPage from '~/pages/ContactPage';
import SignUpPage from '~/pages/SignUpPage';

const publicRoutes = [
  { path: '/', component: HomePage, layout: DefaultLayout, title: 'Home' },
  { path: '/play', component: EnterPIN, layout: null, title: 'Enter Game PIN' },
  { path: '/join', component: JoinGame, layout: null, title: 'Join Game' },
  { path: '/room', component: RoomPage, layout: null, title: 'Room' },
  { path: '/about', component: AboutPage, layout: DefaultLayout, title: 'About Us' },
  { path: '/contact', component: ContactPage, layout: DefaultLayout, title: 'Contact' },
  { path: '/signin', component: SignInPage, layout: null, title: 'Sign' },
  { path: '/signup', component: SignUpPage, layout: null, title: 'Sign Up' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
