import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import DOMPurify from 'dompurify';
import { FaEdit } from 'react-icons/fa';

function ProjectDetail() {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };
    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-detail max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-primary-800">{project.title}</h1>
        {user && user.uid === project.authorId && (
          <Link 
            to={`/edit-project/${id}`} 
            className="btn-secondary flex items-center"
          >
            <FaEdit className="mr-2" /> Edit Project
          </Link>
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
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.content) }}
      />
    </div>
  );
}

export default ProjectDetail;
