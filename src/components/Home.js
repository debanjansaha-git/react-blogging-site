import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Typed from 'typed.js';
import ProjectCard from './ProjectCard';
import SocialMediaFeed from './SocialMediaFeed';
import { getPosts } from '../services/blogService';
import { FaPython, FaDatabase, FaChartBar, FaBrain } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiScikitlearn, SiKeras, SiOpencv, SiPandas, SiNumpy, SiJupyter } from 'react-icons/si';
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';

function Home() {
  const [projects, setProjects] = useState([]);
  const [animate, setAnimate] = useState(false);
  const typedRef = useRef(null);
  const el = useRef(null);
  const skillsRef = useRef(null);

  const skills = [
    { name: 'Python', icon: FaPython, level: 95, color: '#3776AB' },
    { name: 'TensorFlow', icon: SiTensorflow, level: 90, color: '#FF6F00' },
    { name: 'PyTorch', icon: SiPytorch, level: 85, color: '#EE4C2C' },
    { name: 'Scikit-learn', icon: SiScikitlearn, level: 90, color: '#F7931E' },
    { name: 'Keras', icon: SiKeras, level: 85, color: '#D00000' },
    { name: 'OpenCV', icon: SiOpencv, level: 80, color: '#5C3EE8' },
    { name: 'Pandas', icon: SiPandas, level: 95, color: '#150458' },
    { name: 'NumPy', icon: SiNumpy, level: 95, color: '#013243' },
    { name: 'Jupyter', icon: SiJupyter, level: 90, color: '#F37626' },
    { name: 'SQL', icon: FaDatabase, level: 85, color: '#4479A1' },
    { name: 'Data Visualization', icon: FaChartBar, level: 90, color: '#4B0082' },
    { name: 'Deep Learning', icon: FaBrain, level: 85, color: '#00BFFF' },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getPosts();
      setProjects(fetchedProjects);
    };
    fetchProjects();

    // Typed.js initialization
    if (el.current) {
      typedRef.current = new Typed(el.current, {
        strings: [
          "I'm passionate about solving complex problems using AI",
          "I'm a AI Engineering Evangelist",
          "I'm a Senior Applied Scientist",
          "I'm a Senior Machine Learning Engineer",
          "I'm a Solutions Architect"
        ],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true
      });
    }

    // Intersection Observer for skills animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentSkillsRef = skillsRef.current;
    if (currentSkillsRef) {
      observer.observe(currentSkillsRef);
    }

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
      if (currentSkillsRef) {
        observer.unobserve(currentSkillsRef);
      }
    };
  }, []);

  const handleResumeDownload = () => {
    const resumeUrl = process.env.PUBLIC_URL + '/Debanjan_Saha_AI_Engineer_Resume.pdf';
    window.open(resumeUrl, '_blank');
  };

  return (
    <div className="home">
      {/* Hero Section */}
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
            <div className="hidden md:flex items-center justify-center space-x-12">
              <img 
                src={process.env.PUBLIC_URL + '/IMG_4712.JPG'} 
                alt="Your professional headshot" 
                className="rounded-full shadow-2xl" 
                style={{width: '400px', height: '400px', objectFit: 'cover'}} 
              />
              <div className="flex flex-col space-y-6">
                <a href="https://github.com/debanjansaha-git" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-110">
                  <div className="bg-gray-800 p-4 rounded-full shadow-lg">
                    <FaGithub size={60} />
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/debanjanaiml/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-110">
                  <div className="bg-blue-700 p-4 rounded-full shadow-lg">
                    <FaLinkedin size={60} />
                  </div>
                </a>
                <a href="https://dsdojo.medium.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-300 transition-all duration-300 transform hover:scale-110">
                  <div className="bg-green-700 p-4 rounded-full shadow-lg">
                    <FaMedium size={60} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="skills py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">My AI/ML Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center">
                <skill.icon className="text-5xl mb-4" style={{ color: skill.color }} />
                <p className="text-lg font-semibold mb-2">{skill.name}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: animate ? `${skill.level}%` : '0%', 
                      backgroundColor: skill.color 
                    }}
                  ></div>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600">{skill.level}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                {...project} 
                slug={project.slug}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Feed Section */}
      <section className="social-media py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Follow Me</h2>
          <SocialMediaFeed />
        </div>
      </section>
    </div>
  );
}

export default Home;
