import React, { useState, useEffect } from 'react';

function SocialMediaFeed() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // In a real application, you would call your backend API here
    // which would then securely interact with the Twitter API
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    // This is a mock function. In a real app, you'd call your backend API
    const mockTweets = [
      { id: 1, text: "Just published a new blog post on data science best practices!", date: "2023-06-01" },
      { id: 2, text: "Excited to speak at the upcoming AI conference next month!", date: "2023-05-28" },
      { id: 3, text: "Check out my latest data visualization project on GitHub", date: "2023-05-25" },
    ];
    setTweets(mockTweets);
  };

  return (
    <div className="social-media-feed">
      <h2 className="text-2xl font-bold mb-4">Latest Updates</h2>
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-800">{tweet.text}</p>
            <p className="text-sm text-gray-500 mt-2">{tweet.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialMediaFeed;
