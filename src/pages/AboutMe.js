import React, { useState } from 'react';
import Timeline from '../components/Timeline';

function AboutMe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
    alert('Thank you for your message! I will get back to you soon.');
  };

  return (
    <div className="about-me-page pt-20 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary-800">About Me</h1>
      
      <section className="mb-12 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">Who I Am</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          I am a passionate Applied Scientist and Machine Learning Engineer with a deep interest in leveraging data to unlock insights and drive innovation. My career has revolved around building AI-powered solutions across healthcare, retail, marketing, and finance sectors. With expertise in cloud platforms, NLP, and scalable ML models, I focus on solving complex challenges through data-driven approaches.
        </p>
        <p className="text-gray-700 leading-relaxed">
          My journey began in the realm of electronics, transitioned into data science, and evolved as I explored AI applications. Along the way, I’ve delivered impactful solutions that reduce latency, improve predictions, and enhance business outcomes—always seeking new ways to push the boundaries of technology.
        </p>
      </section>

      <section className="mb-12 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">My Experience</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          I have led diverse AI initiatives: from predictive healthcare systems to advanced retail recommendations, enhancing operational efficiency and decision-making across industries.
        </p>
        <Timeline />
      </section>

      <section className="mb-12 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">My Achievements</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Developed COVID-19 severity prediction model, reducing intervention time by 30%.</li>
          <li>Boosted ROI by 15% through multi-touch attribution models.</li>
          <li>Won Spotifys music discovery event for innovative AI-driven solutions.</li>
          <li>Published research on Evolutionary Algorithms in IEEE SOBC Optimization Conference 2021.</li>
        </ul>
      </section>

      <section className="mb-12 bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">Skills</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          I specialize in blending programming expertise with ML frameworks and cloud technologies to build scalable AI solutions.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'MLOps', 'Data Visualization', 'Big Data Technologies', 'Cloud Platforms (AWS, GCP)', 'Statistical Analysis'].map((skill, index) => (
            <span key={index} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">{skill}</span>
          ))}
        </div>
      </section>

      <section className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-700">Get in Touch</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Have a cool project in mind or just want to connect? Drop me a message, and I will get back to you soon!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition duration-300">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}

export default AboutMe;
