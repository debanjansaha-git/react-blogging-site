import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import Projects from './pages/Projects.js';
import ProjectDetail from './pages/ProjectDetail.js';
import AboutMe from './pages/AboutMe.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

function App() {
  const [projects, setProjects] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <Router>
      <div className="App min-h-screen flex flex-col bg-gray-50">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home projects={projects} />} />
            <Route path="/projects" element={<Projects projects={projects} />} />
            <Route path="/projects/:slug" element={<ProjectDetail isLoggedIn={isLoggedIn} />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
