import { HeaderOnly } from '../components/AppLayout';

import Home from '../pages/Home';
import Test from '../pages/Test';
import SignIn from '../pages/SignIn';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/play', component: Test, layout: HeaderOnly },
  { path: '/signin', component: SignIn, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
