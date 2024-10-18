import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <ul className="flex space-x-8">
          {[
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: 'About Me', path: '/about-me' }
          ].map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path}
                className={`text-lg font-semibold transition duration-300 ${
                  isScrolled || location.pathname !== '/' ? 'text-primary-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
                } ${location.pathname === item.path ? 'border-b-2 border-current' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition duration-300 mr-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-secondary-500 text-white px-4 py-2 rounded-md hover:bg-secondary-600 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
