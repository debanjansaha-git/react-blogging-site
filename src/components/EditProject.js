import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPostBySlug, updatePost } from '../services/blogService';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

function EditProject() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [skills, setSkills] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [mediumUrl, setMediumUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [domain, setDomain] = useState('');
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const projectData = await getPostBySlug(slug);
      if (projectData) {
        setTitle(projectData.title);
        setContent(projectData.content);
        setSkills(projectData.skills.join(', '));
        setImageUrl(projectData.imageUrl || '');
        setLinkedinUrl(projectData.linkedinUrl || '');
        setYoutubeUrl(projectData.youtubeUrl || '');
        setMediumUrl(projectData.mediumUrl || '');
        setGithubUrl(projectData.githubUrl || '');
        setDomain(projectData.domain || 'Miscellaneous');
      } else {
        console.log("No such document!");
        navigate('/projects');
      }
      setLoading(false);
    };
    fetchProject();
  }, [slug, navigate]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link'
  ];

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
      let updatedImageUrl = imageUrl;
      if (file) {
        const storageRef = ref(storage, `project-images/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        updatedImageUrl = await getDownloadURL(snapshot.ref);
      }

      const projectData = {
        title,
        content: cleanupContent(content), // Clean up the content before saving
        skills: skills.split(',').map(skill => skill.trim()),
        imageUrl: updatedImageUrl,
        linkedinUrl,
        youtubeUrl,
        mediumUrl,
        githubUrl,
        domain: domain || 'Miscellaneous',
        updatedAt: new Date(),
      };
      
      await updatePost(slug, projectData);
      console.log("Project updated successfully");
      navigate(`/projects/${slug}`, { state: { message: 'Project updated successfully' } });
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
              <img src={imageUrl} alt="Current project" className="mt-2 w-full h-40 object-cover rounded-lg" />
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
              formats={formats}
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
            <Link to={`/projects/${slug}`} className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary">
              Update Project
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditProject;
