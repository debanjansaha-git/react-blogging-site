import React, { useState, useEffect, useCallback } from 'react';
import ProjectCard from '../components/ProjectCard.js';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterProjects = useCallback(() => {
    if (searchQuery.trim() === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.skills && project.skills.toString().toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(`Failed to fetch projects: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <div className="text-center mt-8">Loading projects...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="projects-page pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-800 mb-4">My Projects</h1>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-grow sm:flex-grow-0 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
      {filteredProjects.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No projects found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
