import React from 'react';

const experiences = [
  {
    year: '2023',
    title: 'Senior Data Scientist',
    company: 'Tech Innovators Inc.',
    description: 'Leading machine learning projects and mentoring junior data scientists.'
  },
  {
    year: '2021',
    title: 'Data Scientist',
    company: 'Data Driven Co.',
    description: 'Developed predictive models for customer behavior analysis.'
  },
  {
    year: '2019',
    title: 'Junior Data Analyst',
    company: 'StartUp Analytics',
    description: 'Assisted in data cleaning, visualization, and basic statistical analysis.'
  },
  // Add more experiences as needed
];

function Timeline() {
  return (
    <div className="timeline">
      {experiences.map((experience, index) => (
        <div key={index} className="mb-8 flex">
          <div className="flex-shrink-0 w-24 text-right mr-4">
            <span className="text-blue-600 font-bold">{experience.year}</span>
          </div>
          <div className="border-l-2 border-blue-600 pl-4 pb-8">
            <h3 className="text-xl font-bold">{experience.title}</h3>
            <h4 className="text-lg text-gray-600">{experience.company}</h4>
            <p className="text-gray-700">{experience.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
