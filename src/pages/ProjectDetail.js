import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function ProjectDetail({ isLoggedIn }) {
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [newComment, setNewComment] = useState({ author: '', content: '' });
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await fetchProject();
      await fetchComments();
      await fetchLikes();
    };
    fetchData();
  }, [slug]); // Add fetchProject, fetchComments, and fetchLikes to the dependency array if they use any state or props

  const fetchProject = async () => {
    const response = await fetch(`/api/posts/${slug}`);
    const data = await response.json();
    setProject(data);
  };

  const fetchComments = async () => {
    const response = await fetch(`/api/posts/${slug}/comments`);
    const data = await response.json();
    setComments(data);
  };

  const fetchLikes = async () => {
    const response = await fetch(`/api/posts/${slug}/likes`);
    const data = await response.json();
    setLikes(data.likes);
  };

  const handleLike = async () => {
    if (!isLoggedIn) {
      alert('Please log in to like this post.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/posts/${slug}/like`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLikes(data.likes);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in to comment on this post.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/posts/${slug}/comment`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment.content }),
      });
      const data = await response.json();
      setComments([...comments, data]);
      setNewComment({ content: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-detail pt-16 max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <div className="markdown-content mb-8">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{project.content}</ReactMarkdown>
      </div>
      
      <div className="likes mb-4">
        <button onClick={handleLike} className="bg-blue-500 text-white px-4 py-2 rounded" disabled={!isLoggedIn}>
          Like ({likes})
        </button>
      </div>
      
      <div className="comments mb-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.map(comment => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded mb-4">
            <p className="font-bold">{comment.author}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      
      {isLoggedIn ? (
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <h3 className="text-xl font-bold mb-2">Add a Comment</h3>
          <textarea
            placeholder="Your Comment"
            value={newComment.content}
            onChange={e => setNewComment({...newComment, content: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
            required
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit Comment
          </button>
        </form>
      ) : (
        <p>Please log in to comment on this post.</p>
      )}
    </div>
  );
}

export default ProjectDetail;
