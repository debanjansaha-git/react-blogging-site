import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-primary-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 font-serif">Your Name</h3>
            <p className="text-primary-200">Data Scientist | Machine Learning Engineer | AI Enthusiast</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 font-serif">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-primary-200 hover:text-white transition duration-300">Home</Link></li>
              <li><Link to="/projects" className="text-primary-200 hover:text-white transition duration-300">Projects</Link></li>
              <li><Link to="/about" className="text-primary-200 hover:text-white transition duration-300">About Me</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2 font-serif">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-white transition duration-300">GitHub</a></li>
              <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-white transition duration-300">LinkedIn</a></li>
              <li><a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-white transition duration-300">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-primary-200">
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
