import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/blogService';
import ProjectList from '../components/ProjectList';
import { FaSearch, FaSort, FaFilter, FaExpandAlt, FaCompressAlt } from 'react-icons/fa';
import Select from 'react-select';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date');
  const [filterCriteria, setFilterCriteria] = useState([]);
  const [expandAll, setExpandAll] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getPosts();
      setProjects(fetchedProjects);
      setFilteredProjects(fetchedProjects);
      setLoading(false);

      // Generate filter options
      const domains = new Set(fetchedProjects.map(project => project.domain || 'Miscellaneous'));
      const skills = new Set(fetchedProjects.flatMap(project => project.skills));
      const options = [
        { label: 'Domains', options: Array.from(domains).map(domain => ({ value: domain, label: domain, type: 'domain' })) },
        { label: 'Skills', options: Array.from(skills).map(skill => ({ value: skill, label: skill, type: 'skill' })) }
      ];
      setFilterOptions(options);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let result = projects;

    // Apply search
    if (searchTerm) {
      result = result.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.domain && project.domain.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply filter
    if (filterCriteria.length > 0) {
      result = result.filter(project => 
        filterCriteria.some(criteria => 
          (criteria.type === 'domain' && project.domain === criteria.value) ||
          (criteria.type === 'skill' && project.skills.includes(criteria.value))
        )
      );
    }

    // Apply sort
    result.sort((a, b) => {
      if (sortCriteria === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortCriteria === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    setFilteredProjects(result);
  }, [searchTerm, sortCriteria, filterCriteria, projects]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilter = (selectedOptions) => {
    setFilterCriteria(selectedOptions);
  };

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">My Projects</h1>
      <div className="mb-6 bg-white shadow-md rounded-lg p-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex items-center">
            <FaSort className="mr-2 text-gray-600" />
            <select
              value={sortCriteria}
              onChange={(e) => handleSort(e.target.value)}
              className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
          </div>
          <div className="flex-grow">
            <div className="flex items-center">
              <FaFilter className="mr-2 text-gray-600" />
              <Select
                isMulti
                options={filterOptions}
                onChange={handleFilter}
                className="w-full"
                placeholder="Filter by domain or skill..."
                styles={{
                  control: (provided) => ({
                    ...provided,
                    minHeight: '38px',
                  }),
                }}
              />
            </div>
          </div>
          <button
            onClick={toggleExpandAll}
            className="w-full md:w-auto flex items-center justify-center bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {expandAll ? <FaCompressAlt className="mr-2" /> : <FaExpandAlt className="mr-2" />}
            {expandAll ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>
      <ProjectList projects={filteredProjects} expandAll={expandAll} />
    </div>
  );
}

export default Projects;
