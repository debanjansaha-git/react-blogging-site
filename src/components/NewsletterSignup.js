import React, { useState } from 'react';
import { addSubscriber } from '../services/newsletterService';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSubscriber(email);
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="newsletter-signup">
      <h3 className="text-lg font-semibold mb-2">Subscribe to My Newsletter</h3>
      <p className="mb-4">Get the latest updates on my projects and insights.</p>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="btn-primary rounded-l-none">
          Subscribe
        </button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}

export default NewsletterSignup;
