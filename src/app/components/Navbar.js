'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link 
          href="/HomeViewScreen" 
          className={`nav-link ${pathname === '/HomeViewScreen' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          href="/StatsViewScreen" 
          className={`nav-link ${pathname === '/StatsViewScreen' ? 'active' : ''}`}
        >
          Stats
        </Link>
        <Link 
          href="/GraphViewScreen" 
          className={`nav-link ${pathname === '/GraphViewScreen' ? 'active' : ''}`}
        >
          Graphs
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 