import React from 'react';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import DOMPurify from 'dompurify';

function BlogPost({ post }) {
  const sanitizedContent = DOMPurify.sanitize(post.content, {
    ADD_ATTR: ['target']
  });

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.skills.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-600 hover:text-red-500 transition">
              <FaHeart className="mr-2" /> {post.likes || 0}
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500 transition">
              <FaComment className="mr-2" /> {post.comments?.length || 0}
            </button>
            <button className="flex items-center text-gray-600 hover:text-green-500 transition">
              <FaShare className="mr-2" /> Share
            </button>
          </div>
          <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="space-y-4 text-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800">Project Overview</h2>
          <p className="leading-relaxed">{post.overview}</p>
          
          <h3 className="text-xl font-semibold text-gray-800">Key Features:</h3>
          <ul className="list-disc list-inside space-y-1">
            {post.keyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800">Technologies Used:</h3>
          <div className="flex flex-wrap gap-2">
            {post.technologies.map((tech, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {tech}
              </span>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800">Impact:</h3>
          <p className="leading-relaxed">{post.impact}</p>
          
          <div className="mt-6 space-y-4 blog-content">
            <div 
              dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
              className="prose prose-lg max-w-none custom-blog-content"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
