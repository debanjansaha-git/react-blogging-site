import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, analytics } from './firebase.js';
import { logEvent } from 'firebase/analytics';

// Import your components
import Header from './components/Header';
import Home from './components/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import AboutMe from './pages/AboutMe';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';
import Footer from './components/Footer';

function App() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      logEvent(analytics, 'login', { method: 'Google' });
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/create-project" 
              element={
                <ProtectedRoute>
                  <CreateProject />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-project/:id" 
              element={
                <ProtectedRoute>
                  <EditProject />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
