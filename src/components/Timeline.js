import React, { useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';

const experiences = [
  {
    year: '2024',
    title: 'Senior AI Engineer',
    company: 'Northeastern University',
    description: 'Graduate Applications Screening using Gen AI.'
  },
  {
    year: '2023',
    title: 'Principal AI Engineer',
    company: 'Nanobiosym',
    description: 'Built predictive healthcare AI improving response speed.'
  },
  {
    year: '2021',
    title: 'Senior Data Scientist',
    company: 'Prescriber 360',
    description: 'Boosted marketing ROI using advanced data models.'
  },
  {
    year: '2019',
    title: 'Senior Data Scientist',
    company: 'Cognizant',
    description: 'Enhanced retail recommendations with ML pipelines.'
  },
  {
    year: '2015',
    title: 'Data Scientist',
    company: 'Tata Consultancy Services',
    description: 'Developed AML models, reducing false positives.'
  },
  {
    year: '2013',
    title: 'Associate Data Warehouse Engineer',
    company: 'ITC Infotech',
    description: 'Accelerated data queries through optimized schema design.'
  },
];

function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div className="max-w-4xl mx-auto">
      {experiences.map((experience, index) => (
        <div key={index} className="flex mb-8">
          <div className="flex-shrink-0 w-24 text-right mr-8">
            <span className="text-blue-600 font-bold">{experience.year}</span>
          </div>
          <div className="flex-grow pb-8 border-l-2 border-blue-600 pl-8 relative">
            <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 top-1.5"></div>
            <h3 className="text-xl font-bold">{experience.title}</h3>
            <h4 className="text-lg text-gray-600 mb-2">{experience.company}</h4>
            {expandedIndex === index ? (
              <p className="text-gray-700">{experience.description}</p>
            ) : (
              <button 
                onClick={() => setExpandedIndex(index)} 
                className="text-blue-500 hover:text-blue-700"
              >
                Show details
              </button>
            )}
            {expandedIndex === index && (
              <button 
                onClick={() => setExpandedIndex(null)} 
                className="text-blue-500 hover:text-blue-700 ml-4"
              >
                Hide details
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
