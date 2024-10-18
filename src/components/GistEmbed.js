import React, { useEffect } from 'react';

const GistEmbed = ({ id }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://gist.github.com/${id}.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [id]);

  return <div id={`gist-${id}`} />;
};

export default GistEmbed;
