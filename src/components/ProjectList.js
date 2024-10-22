import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

function ProjectList({ projects, expandAll }) {
  const [openDomains, setOpenDomains] = useState([]);

  useEffect(() => {
    if (expandAll) {
      setOpenDomains(Object.keys(groupedProjects));
    } else {
      setOpenDomains([]);
    }
  }, [expandAll, groupedProjects]); // Add groupedProjects to the dependency array

  const toggleDomain = (domain) => {
    setOpenDomains(prev => 
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
    );
  };

  const groupedProjects = projects.reduce((acc, project) => {
    const domain = project.domain || 'Miscellaneous';
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(project);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedProjects).map(([domain, domainProjects]) => (
        <div key={domain} className="mb-8">
          <h2 
            className="text-2xl font-bold mb-4 cursor-pointer flex items-center"
            onClick={() => toggleDomain(domain)}
          >
            <span className="mr-2">{openDomains.includes(domain) ? '▼' : '▶'}</span>
            {domain}
          </h2>
          {openDomains.includes(domain) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {domainProjects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
