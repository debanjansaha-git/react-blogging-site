import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { FaGoogle } from 'react-icons/fa';

function Login() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-md"
        >
          <FaGoogle className="text-xl" />
          <span>Sign in with Google</span>
        </button>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
