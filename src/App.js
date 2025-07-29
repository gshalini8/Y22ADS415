import React, { useState } from 'react';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Render:', { originalUrl, shortenedUrl, error, loading }); // Debug

  const shortenUrl = () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      const newShortened = `http://short/${Math.random().toString(36).substr(2, 9)}`;
      setShortenedUrl(newShortened);
      setLoading(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit with:', originalUrl); // Debug
    if (!originalUrl) {
      setError('Please enter a valid URL');
      return;
    }
    shortenUrl();
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => {
            console.log('Input:', e.target.value); // Debug
            setOriginalUrl(e.target.value);
          }}
          placeholder="Enter URL to shorten"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortenedUrl && (
        <div>
          <p>Shortened URL: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a></p>
          <p>Validity: 24 hours</p>
        </div>
      )}
    </div>
  );
}

export default App;