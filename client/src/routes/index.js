import { HeaderOnly } from '../components/AppLayout';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import EnterPIN from '../pages/Enter/EnterPIN';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/play', component: EnterPIN, layout: null, title: "Enter Game PIN" },
  { path: '/signin', component: SignIn, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
