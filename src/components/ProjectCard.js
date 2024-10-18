import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SkillTag from './SkillTag.js';

function ProjectCard({ slug, title, date, skills, content }) {
  const skillsArray = Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : []);

  // Function to strip markdown and limit the preview to 100 characters
  const getContentPreview = (content) => {
    const strippedContent = content.replace(/[#*`_[\]]/g, ''); // Remove common markdown symbols
    return strippedContent.substring(0, 100) + (strippedContent.length > 100 ? '...' : '');
  };

  return (
    <div className="project-card bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-primary-800">{title}</h3>
        <div className="text-gray-600 mb-3 text-sm">
          <ReactMarkdown>{getContentPreview(content)}</ReactMarkdown>
        </div>
        <div className="skills flex flex-wrap gap-1 mb-3">
          {skillsArray.slice(0, 3).map((skill, index) => (
            <SkillTag key={index} skill={skill} />
          ))}
        </div>
        <Link to={`/projects/${slug}`} className="btn-primary text-sm py-1 px-3">
          Read more
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
