import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useCheckUserPermissions } from '../services/userService';

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const [canCreate, checkingPermissions] = useCheckUserPermissions(user?.uid);

  if (loading || checkingPermissions) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!canCreate) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p>You don't have permission to access this page. Please contact the system administrator.</p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
