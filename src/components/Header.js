import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useCheckUserPermissions } from '../services/userService';

function Header() {
  const [user] = useAuthState(auth);
  const [canCreate, checkingPermissions] = useCheckUserPermissions(user?.uid);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowCreateProject(user && canCreate && !checkingPermissions);
  }, [user, canCreate, checkingPermissions]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-yellow-300 transition duration-300">My Portfolio</Link>
          </div>
          <div className="flex space-x-6 items-center">
            <NavLink to="/" isActive={isActive('/')}>Home</NavLink>
            <NavLink to="/projects" isActive={isActive('/projects')}>Projects</NavLink>
            <NavLink to="/about-me" isActive={isActive('/about-me')}>About Me</NavLink>
            {showCreateProject && (
              <NavLink to="/create-project" isActive={isActive('/create-project')}>Create Project</NavLink>
            )}
            {user ? (
              <button 
                onClick={() => auth.signOut()} 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, children, isActive }) {
  return (
    <Link 
      to={to} 
      className={`text-lg font-semibold hover:text-yellow-300 transition duration-300 ${
        isActive ? 'border-b-2 border-yellow-300' : ''
      }`}
    >
      {children}
    </Link>
  );
}

export default Header;
