import { HeaderOnly, DefaultLayout } from '../components/AppLayout';

import HomePage from '../pages/HomePage';
import SignIn from '../pages/SignIn';
import EnterPIN from '../pages/EnterPIN';
import JoinGame from '../pages/JoinGame';
import RoomPage from '../pages/RoomPage';
import AboutPage from '../pages/AboutPage';

const publicRoutes = [
  { path: '/', component: HomePage, layout: DefaultLayout, title: 'Home' },
  { path: '/play', component: EnterPIN, layout: null, title: 'Enter Game PIN' },
  { path: '/join', component: JoinGame, layout: null, title: 'Join Game' },
  { path: '/room', component: RoomPage, layout: null, title: 'Room' },
  { path: '/about', component: AboutPage, layout: DefaultLayout, title: 'About Page' },
  { path: '/signin', component: SignIn, layout: null, title: 'Sign' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
