import React, { useState } from 'react';
import axios from 'axios';

const UrlShortener: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!originalUrl) {
      setError('Please enter a URL.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/shorten', {
        originalUrl,
      });
      setShortUrl(response.data.shortUrl);
      setError('');
    } catch (error: any) {
      setError('Failed to shorten URL. Please try again.', error);
    }
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortUrl && (
        <div>
          <h3>Shortened URL:</h3>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
