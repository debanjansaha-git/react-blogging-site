import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { addComment, getComments } from '../services/blogService';
import { FaHeart, FaReply } from 'react-icons/fa';

function Comment({ comment, onReply, currentUser, level = 0 }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    onReply(comment.id, replyContent);
    setReplyContent('');
    setShowReplyForm(false);
  };

  const formatDate = (dateValue) => {
    if (dateValue instanceof Date) {
      return dateValue.toLocaleString();
    } else if (dateValue && typeof dateValue.toDate === 'function') {
      return dateValue.toDate().toLocaleString();
    } else if (dateValue && dateValue.seconds) {
      return new Date(dateValue.seconds * 1000).toLocaleString();
    } else {
      return 'Unknown date';
    }
  };

  return (
    <div className={`mb-4 p-4 bg-gray-100 rounded-lg ${level > 0 ? 'ml-8' : ''}`}>
      <p className="font-bold">{comment.userName}</p>
      <p>{comment.text}</p>
      <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
      <div className="mt-2 flex items-center space-x-4">
        <button onClick={() => setShowReplyForm(!showReplyForm)} className="flex items-center text-gray-500">
          <FaReply className="mr-1" /> Reply
        </button>
      </div>
      {showReplyForm && (
        <div className="mt-2">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Write a reply..."
          />
          <button onClick={handleReply} className="mt-2 btn-primary">Post Reply</button>
        </div>
      )}
      {comment.replies && comment.replies.map((reply, index) => (
        <Comment 
          key={index}
          comment={reply} 
          onReply={onReply} 
          currentUser={currentUser}
          level={level + 1}
        />
      ))}
    </div>
  );
}

function CommentSection({ projectId }) {
  const [user] = useAuthState(auth);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [projectId]); // Change postId to projectId

  const fetchComments = async () => {
    const fetchedComments = await getComments(projectId);
    setComments(fetchedComments);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (newComment.trim() === '') return;

    const commentData = {
      id: Date.now().toString(),
      text: newComment,
      userId: user.uid,
      userName: user.displayName,
      createdAt: new Date(),
      replies: []
    };

    await addComment(projectId, commentData);
    setNewComment('');
    fetchComments();
  };

  const handleReply = async (parentCommentId, replyText) => {
    if (!user) return;
    if (replyText.trim() === '') return;

    const replyData = {
      id: Date.now().toString(),
      text: replyText,
      userId: user.uid,
      userName: user.displayName,
      createdAt: new Date(),
      replies: []
    };

    const updatedComments = comments.map(comment => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), replyData]
        };
      }
      return comment;
    });

    setComments(updatedComments);

    await addComment(projectId, updatedComments.find(c => c.id === parentCommentId));
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      {comments.map((comment) => (
        <Comment 
          key={comment.id} 
          comment={comment} 
          onReply={handleReply}
          currentUser={user}
        />
      ))}
      {user ? (
        <form onSubmit={handleSubmitComment} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Add a comment..."
          />
          <button type="submit" className="mt-2 btn-primary">
            Post Comment
          </button>
        </form>
      ) : (
        <p>Please log in to comment.</p>
      )}
    </div>
  );
}

export default CommentSection;
