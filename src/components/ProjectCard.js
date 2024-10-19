import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ slug, title, content, skills, imageUrl, onSkillClick }) {
  // Function to strip HTML tags and limit the preview to 100 characters
  const getContentPreview = (content) => {
    const strippedContent = content.replace(/<[^>]+>/g, '');
    return strippedContent.substring(0, 100) + (strippedContent.length > 100 ? '...' : '');
  };

  // Placeholder image URL
  const placeholderImage = 'https://via.placeholder.com/400x200?text=No+Image+Available';

  return (
    <div className="project-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out hover:shadow-lg">
      <Link to={`/projects/${slug}`}>
        <img 
          src={imageUrl || placeholderImage} 
          alt={title} 
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
        />
      </Link>
      <div className="p-4">
        <Link to={`/projects/${slug}`}>
          <h3 className="text-xl font-semibold mb-2 text-primary-800 hover:text-primary-600">{title}</h3>
        </Link>
        <Link to={`/projects/${slug}`}>
          <div className="text-gray-600 mb-3 text-sm hover:text-gray-800">
            {getContentPreview(content)}
          </div>
        </Link>
        <div className="skills flex flex-wrap gap-1 mb-3">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-gray-300"
              onClick={(e) => {
                e.preventDefault();
                onSkillClick(skill);
              }}
            >
              {skill}
            </span>
          ))}
        </div>
        <Link to={`/projects/${slug}`} className="text-blue-600 hover:text-blue-800">
          Read more
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
