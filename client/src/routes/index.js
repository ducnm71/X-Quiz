import { HeaderOnly, DefaultLayout } from '../components/AppLayout';

import HomePage from '../pages/HomePage';
import SignIn from '../pages/SignIn';
import EnterPIN from '../pages/Enter/EnterPIN';
import RoomPage from '../pages/RoomPage';

const publicRoutes = [
  { path: '/', component: HomePage, layout: DefaultLayout, title: 'Home' },
  { path: '/play', component: EnterPIN, layout: null, title: 'Enter Game PIN' },
  { path: '/room', component: RoomPage, layout: DefaultLayout, title: 'Room' },
  { path: '/signin', component: SignIn, layout: null, title: 'Sign' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
