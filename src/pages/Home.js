import React from 'react';
import { Link } from 'react-router-dom';
import useTypingEffect from '../hooks/useTypingEffect.js';
import Timeline from '../components/Timeline.js';
import ProjectCard from '../components/ProjectCard.js';
import SocialMediaFeed from '../components/SocialMediaFeed.js';

function Home({ projects }) {
  const typedText = useTypingEffect(['Data Scientist', 'Machine Learning Engineer', 'AI Enthusiast']);

  return (
    <div className="home-page">
      <section className="hero relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-32 mb-12">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">Welcome to My Portfolio</h1>
              <div className="text-2xl md:text-3xl h-8 mb-6">
                I'm a <span className="font-bold">{typedText}</span>
                <span className="animate-pulse">|</span>
              </div>
              <p className="text-xl mb-8">Passionate about leveraging data to drive insights and innovation.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/projects" className="btn-primary">
                  View My Work
                </Link>
                <a 
                  href="/path/to/your/resume.pdf" 
                  download 
                  className="btn-secondary"
                >
                  Download Resume
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/path/to/your/image.jpg" 
                alt="Your Name" 
                className="rounded-full w-64 h-64 object-cover border-4 border-white shadow-lg transform hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="experience mb-12 py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center font-serif text-primary-800">My Experience</h2>
          <Timeline />
        </div>
      </section>

      <section className="featured-projects mb-12 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center font-serif text-primary-800">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
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

      <section className="social-media mb-12 py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center font-serif text-primary-800">Latest Updates</h2>
          <SocialMediaFeed />
        </div>
      </section>
    </div>
  );
}

export default Home;
