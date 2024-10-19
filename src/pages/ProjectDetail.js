import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import DOMPurify from 'dompurify';
import { FaEdit, FaTrash, FaLinkedin, FaYoutube, FaMedium, FaGithub } from 'react-icons/fa';
import { getPostBySlug, deletePost } from '../services/blogService';

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [message, setMessage] = useState('');
  const { slug } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProject = async () => {
      const fetchedProject = await getPostBySlug(slug);
      if (fetchedProject) {
        setProject(fetchedProject);
      } else {
        console.log("No such document!");
        navigate('/projects');
      }
    };
    fetchProject();

    // Check for update message in location state
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      // Clear the message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }
  }, [slug, navigate, location]);

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this project? This action cannot be undone.');
    if (isConfirmed) {
      try {
        await deletePost(project.id, project.imageUrl);
        setMessage('Project deleted successfully');
        setTimeout(() => {
          navigate('/projects', { state: { message: 'Project deleted successfully' } });
        }, 2000);
      } catch (error) {
        console.error('Error deleting project:', error);
        setMessage('Error deleting project. Please try again.');
      }
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-detail max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      {message && (
        <div className={`mb-4 p-2 ${message.includes('deleted') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded`}>
          {message}
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-primary-800">{project.title}</h1>
        {user && user.uid === project.authorId && (
          <div className="flex space-x-2">
            <Link 
              to={`/edit-project/${project.slug}`} 
              className="btn-secondary flex items-center"
            >
              <FaEdit className="mr-2" /> Edit
            </Link>
            <button 
              onClick={handleDelete}
              className="btn-danger flex items-center"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        )}
      </div>
      
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      )}
      <div className="mb-4">
        {project.skills.map((skill, index) => (
          <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex space-x-4 mb-6">
        {project.linkedinUrl && (
          <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaLinkedin size={32} />
          </a>
        )}
        {project.youtubeUrl && (
          <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
            <FaYoutube size={32} />
          </a>
        )}
        {project.mediumUrl && (
          <a href={project.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
            <FaMedium size={32} />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
            <FaGithub size={32} />
          </a>
        )}
      </div>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.content) }}
      />
    </div>
  );
}

export default ProjectDetail;
