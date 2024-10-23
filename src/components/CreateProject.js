import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPost } from '../services/blogService';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

function CreateProject() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [skills, setSkills] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [mediumUrl, setMediumUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [domain, setDomain] = useState(''); // New state for domain
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block']
    ],
  };

  const cleanupContent = (html) => {
    // Use DOMPurify to sanitize the HTML
    let clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'img'],
      ALLOWED_ATTR: ['href', 'src', 'alt']
    });

    // Remove empty paragraphs and excessive line breaks
    clean = clean.replace(/<p><br><\/p>/g, '');
    clean = clean.replace(/<p>&nbsp;<\/p>/g, '');
    clean = clean.replace(/(<br\s*\/?>){3,}/g, '<br><br>');

    // Wrap loose text in paragraphs
    clean = clean.replace(/^(?!<[p|ul|ol|h[1-6]]>)(.+)(?!<\/[p|ul|ol|h[1-6]]>)$/gm, '<p>$1</p>');

    return clean;
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (file) {
        const storageRef = ref(storage, `project-images/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const projectData = {
        title,
        content: cleanupContent(content),
        skills: skills.split(',').map(skill => skill.trim()),
        imageUrl,
        linkedinUrl,
        youtubeUrl,
        mediumUrl,
        githubUrl,
        domain: domain || 'Miscellaneous', // Include domain in projectData
        createdAt: new Date(),
      };
      
      const { slug } = await createPost(projectData);
      navigate(`/projects/${slug}`, { state: { message: 'Project created successfully' } });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Project Image</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imageUrl && (
            <img src={imageUrl} alt="Project preview" className="mt-2 w-full h-40 object-cover rounded-lg" />
          )}
        </div>
        <div>
          <label htmlFor="skills" className="block text-gray-700 font-bold mb-2">Skills (comma-separated)</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <ReactQuill 
            value={content} 
            onChange={setContent} 
            modules={modules}
            className="h-96 mb-12" // Increased height
          />
        </div>
        <div>
          <label htmlFor="linkedinUrl" className="block text-gray-700 font-bold mb-2">LinkedIn URL</label>
          <input
            type="url"
            id="linkedinUrl"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="youtubeUrl" className="block text-gray-700 font-bold mb-2">YouTube URL</label>
          <input
            type="url"
            id="youtubeUrl"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="mediumUrl" className="block text-gray-700 font-bold mb-2">Medium URL</label>
          <input
            type="url"
            id="mediumUrl"
            value={mediumUrl}
            onChange={(e) => setMediumUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="githubUrl" className="block text-gray-700 font-bold mb-2">GitHub URL</label>
          <input
            type="url"
            id="githubUrl"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="domain" className="block text-gray-700 font-bold mb-2">Domain</label>
          <input
            type="text"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Healthcare, Retail, or leave blank for Miscellaneous"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Link to="/projects" className="btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn-primary">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
