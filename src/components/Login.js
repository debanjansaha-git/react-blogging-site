import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../components/Auth.js';

function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <button 
        onClick={handleLogin} 
        className="btn-primary w-full"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
