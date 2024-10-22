import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useCheckUserPermissions } from '../services/userService';

function Header() {
  const [user] = useAuthState(auth);
  const [canCreate, checkingPermissions] = useCheckUserPermissions(user?.uid);
  const [showCreateProject, setShowCreateProject] = useState(false);

  useEffect(() => {
    setShowCreateProject(user && canCreate && !checkingPermissions);
  }, [user, canCreate, checkingPermissions]);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-700">
            <Link to="/">My Portfolio</Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-800 hover:text-blue-500">Home</Link>
            <Link to="/projects" className="text-gray-800 hover:text-blue-500">Projects</Link>
            <Link to="/about-me" className="text-gray-800 hover:text-blue-500">About Me</Link>
            {showCreateProject && (
              <Link to="/create-project" className="text-gray-800 hover:text-blue-500">Create Project</Link>
            )}
            {user ? (
              <button onClick={() => auth.signOut()} className="text-gray-800 hover:text-blue-500">Logout</button>
            ) : (
              <Link to="/login" className="text-gray-800 hover:text-blue-500">Login</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
