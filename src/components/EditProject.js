import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { updatePost } from '../services/blogService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditProject() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [skills, setSkills] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const projectData = docSnap.data();
        setTitle(projectData.title);
        setContent(projectData.content);
        setSkills(projectData.skills.join(', '));
        setImageUrl(projectData.imageUrl || '');
      } else {
        console.log("No such document!");
        navigate('/projects');
      }
      setLoading(false);
    };
    fetchProject();
  }, [id, navigate]);

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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedImageUrl = imageUrl;
      if (file) {
        const storageRef = ref(storage, `project-images/${id}`);
        await uploadBytes(storageRef, file);
        updatedImageUrl = await getDownloadURL(storageRef);
      }

      const projectData = {
        title,
        content,
        skills: skills.split(',').map(skill => skill.trim()),
        imageUrl: updatedImageUrl,
        updatedAt: new Date(),
      };
      await updatePost(id, projectData);
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6">Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Project Image</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {imageUrl && <img src={imageUrl} alt="Current project image" className="mt-2 w-full h-40 object-cover rounded-lg" />}
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700 font-bold mb-2">Skills (comma-separated)</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
          <ReactQuill 
            value={content} 
            onChange={setContent} 
            modules={modules}
            className="h-64 mb-4"
          />
        </div>
        <button type="submit" className="btn-primary">
          Update Project
        </button>
      </form>
    </div>
  );
}

export default EditProject;
