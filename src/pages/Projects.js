import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getPosts } from '../services/blogService';
import ProjectCard from '../components/ProjectCard';
import { FaSearch, FaSort, FaFilter } from 'react-icons/fa';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerms, setSearchTerms] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [showSkillsFilter, setShowSkillsFilter] = useState(false);
  const location = useLocation();
  const skillsFilterRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getPosts();
      setProjects(fetchedProjects);
    };
    fetchProjects();

    if (location.state && location.state.message) {
      setMessage(location.state.message);
      setTimeout(() => setMessage(''), 3000);
    }

    // Add click event listener to close the skills filter when clicking outside
    const handleClickOutside = (event) => {
      if (skillsFilterRef.current && !skillsFilterRef.current.contains(event.target)) {
        setShowSkillsFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location]);

  const allSkills = [...new Set(projects.flatMap(project => project.skills))];

  const filteredProjects = projects.filter(project => {
    const matchesSearchTerms = searchTerms.length === 0 || searchTerms.some(term => 
      project.title.toLowerCase().includes(term.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(term.toLowerCase())) ||
      project.content.toLowerCase().includes(term.toLowerCase())
    );

    const matchesSelectedSkills = selectedSkills.length === 0 || 
      selectedSkills.every(skill => project.skills.includes(skill));

    return matchesSearchTerms && matchesSelectedSkills;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortOption) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'oldest':
        return a.createdAt.toMillis() - b.createdAt.toMillis();
      case 'newest':
        return b.createdAt.toMillis() - a.createdAt.toMillis();
      default:
        return 0;
    }
  });

  const handleSkillChange = (skill) => {
    setSelectedSkills(prevSkills => 
      prevSkills.includes(skill)
        ? prevSkills.filter(s => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const terms = searchQuery.split(' ').filter(term => term.trim() !== '');
    setSearchTerms(terms);
  };

  const handleSearchTermRemove = (term) => {
    setSearchTerms(prevTerms => prevTerms.filter(t => t !== term));
    setSearchQuery(prevQuery => prevQuery.replace(term, '').trim());
  };

  const handleClearAllFilters = () => {
    setSelectedSkills([]);
    setSearchTerms([]);
    setSearchQuery('');
  };

  return (
    <div className="projects-page bg-gray-100 min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {message && (
          <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-lg shadow">
            {message}
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Projects</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative flex-grow w-full md:w-auto">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-400" />
              </button>
            </form>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0" ref={skillsFilterRef}>
                <button
                  onClick={() => setShowSkillsFilter(!showSkillsFilter)}
                  className="w-full bg-white border border-gray-300 p-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                >
                  <span>{selectedSkills.length ? `${selectedSkills.length} selected` : 'Filter by skills'}</span>
                  <FaFilter className="text-gray-400" />
                </button>
                {showSkillsFilter && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    {allSkills.map((skill) => (
                      <label key={skill} className="flex items-center p-2 hover:bg-gray-100">
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => handleSkillChange(skill)}
                          className="mr-2"
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative flex-grow md:flex-grow-0">
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="appearance-none w-full bg-white border border-gray-300 p-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Title</option>
                </select>
                <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          {(selectedSkills.length > 0 || searchTerms.length > 0) && (
            <div className="mb-4 flex flex-wrap items-center bg-blue-50 p-3 rounded-lg">
              <span className="mr-2 text-blue-700">Filtered by:</span>
              {selectedSkills.map(skill => (
                <span key={skill} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2">
                  {skill}
                  <button 
                    onClick={() => handleSkillChange(skill)}
                    className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
              {searchTerms.map(term => (
                <span key={term} className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2">
                  {term}
                  <button 
                    onClick={() => handleSearchTermRemove(term)}
                    className="ml-1 text-green-600 hover:text-green-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button 
                onClick={handleClearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              {...project} 
              slug={project.slug}
              imageUrl={project.imageUrl}
              onSkillClick={handleSkillChange}
            />
          ))}
        </div>
        {sortedProjects.length === 0 && (
          <div className="text-center text-gray-600 mt-8">
            No projects found. Try adjusting your search or filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
