import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOutUser } from './Auth';

function Header() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">My Portfolio</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
            <li><Link to="/projects" className="text-gray-600 hover:text-blue-600">Projects</Link></li>
            <li><Link to="/about-me" className="text-gray-600 hover:text-blue-600">About Me</Link></li>
            {user && (
              <li><Link to="/create-project" className="text-gray-600 hover:text-blue-600">Create Project</Link></li>
            )}
          </ul>
        </nav>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <img 
                src={user.photoURL || 'https://via.placeholder.com/40'} 
                alt="Profile" 
                className="w-10 h-10 rounded-full"
              />
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-blue-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
