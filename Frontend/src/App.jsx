import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeWebsite = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMetrics(null);

      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setMetrics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  return (
    <div className="app">
      <h1>Website Performance Analyzer</h1>
      
      <div className="input-container">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL (e.g. https://example.com)"
          disabled={loading}
        />
        <button 
          onClick={analyzeWebsite}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {metrics && (
        <div className="metrics">
          <div className="metric-card">
            <h2>Load Time</h2>
            <p>{metrics.loadTime} ms</p>
          </div>
          <div className="metric-card">
            <h2>Page Size</h2>
            <p>{formatSize(metrics.pageSize)}</p>
          </div>
          <div className="metric-card">
            <h2>Requests</h2>
            <p>{metrics.requestCount}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;