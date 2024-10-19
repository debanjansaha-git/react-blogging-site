import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Typed from 'typed.js';
import Timeline from './Timeline';
import ProjectCard from './ProjectCard';
import SocialMediaFeed from './SocialMediaFeed';
import { getPosts } from '../services/blogService';

function Home() {
  const [projects, setProjects] = useState([]);
  const typedRef = useRef(null);
  const el = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getPosts();
      setProjects(fetchedProjects);
    };
    fetchProjects();

    const options = {
      strings: [
        "I'm a Data Scientist",
        "I'm a Machine Learning Engineer",
        "I'm passionate about solving complex problems"
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    };

    if (el.current) {
      typedRef.current = new Typed(el.current, options);
    }

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, []);

  const handleResumeDownload = () => {
    // Replace '/path-to-your-resume.pdf' with the actual path to your resume file
    const resumeUrl = '/path-to-your-resume.pdf';
    window.open(resumeUrl, '_blank');
  };

  return (
    <div className="home">
      <section className="hero min-h-screen flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Welcome to My Portfolio</h1>
              <div className="text-2xl mb-8 h-20">
                <span ref={el}></span>
              </div>
              <div className="flex space-x-4">
                <Link to="/projects" className="btn-primary">
                  View My Projects
                </Link>
                <button onClick={handleResumeDownload} className="btn-secondary">
                  Download Resume
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src={process.env.PUBLIC_URL + '/IMG_4712.JPG'} 
                alt="Your professional headshot" 
                className="rounded-full shadow-2xl" 
                style={{width: '400px', height: '400px', objectFit: 'cover'}} 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="experience py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">My Experience</h2>
          <Timeline />
        </div>
      </section>

      <section className="featured-projects py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="social-media py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Latest Updates</h2>
          <SocialMediaFeed />
        </div>
      </section>
    </div>
  );
}

export default Home;
