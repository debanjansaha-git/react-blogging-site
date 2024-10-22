import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useCheckUserPermissions } from '../services/userService';

function Navigation() {
  const [user] = useAuthState(auth);
  const [canCreate] = useCheckUserPermissions(user?.uid);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/about-me">About Me</Link>
      {user && canCreate && <Link to="/create-project">Create Project</Link>}
      {/* Other navigation items */}
    </nav>
  );
}

export default Navigation;
