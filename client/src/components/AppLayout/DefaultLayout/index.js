import NavbarTop from '../components/NavbarTop';
import Footer from '../components/Footer';

import './index.css';

function DefaultLayout({ children }) {
  return (
    <div className="container">
      <NavbarTop />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
