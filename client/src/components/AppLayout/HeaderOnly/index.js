import NavbarTop from '../components/NavbarTop';
import './index.css';

function HeaderOnly({ children }) {
  return (
    <div className="container">
      <NavbarTop />
      {children}
    </div>
  );
}

export default HeaderOnly;
