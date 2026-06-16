import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';

function Header() {
  return (
    <header className="global-header">
      <div className="header-inner">
        <Magnetic>
          <Link to="/" className="logo">HT.</Link>
        </Magnetic>
        <nav className="global-nav">
          <Magnetic><Link to="/about">ABOUT</Link></Magnetic>
          <Magnetic><Link to="/works">WORKS</Link></Magnetic>
          <Magnetic><Link to="/contact">CONTACT</Link></Magnetic>
        </nav>
      </div>
    </header>
  );
}

export default Header;