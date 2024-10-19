import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ id, title, content, skills }) {
  // Function to strip HTML tags and limit the preview to 100 characters
  const getContentPreview = (content) => {
    const strippedContent = content.replace(/<[^>]+>/g, '');
    return strippedContent.substring(0, 100) + (strippedContent.length > 100 ? '...' : '');
  };

  return (
    <div className="project-card bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-primary-800">{title}</h3>
        <div className="text-gray-600 mb-3 text-sm">
          {getContentPreview(content)}
        </div>
        <div className="skills flex flex-wrap gap-1 mb-3">
          {skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
              {skill}
            </span>
          ))}
        </div>
        <Link to={`/projects/${id}`} className="text-blue-600 hover:text-blue-800">
          Read more
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
