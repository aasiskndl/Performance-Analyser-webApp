import React, { useState } from 'react';
import './App.css';
import useWebsiteAnalyzer from './hooks/useWebsiteAnalyzer';
import useMetricsFormatter from './hooks/useMetricsFormatter';
import MetricsCards from './components/MetricsCards';
import ResourceBreakdown from './components/ResourceBreakdown';

function App() {
  const [url, setUrl] = useState('');
  const { metrics, loading, error, analyzeWebsite } = useWebsiteAnalyzer();
  const { formatSize } = useMetricsFormatter();

  const handleSubmit = (e) => {
    e.preventDefault();
    analyzeWebsite(url);
  };

  return (
    <div className="app">
      <h1>Website Performance Analyzer</h1>
      
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL (e.g. https://example.com)"
          disabled={loading}
        />
        <button 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {metrics && (
        <div className="results">
          <MetricsCards metrics={metrics} formatSize={formatSize} />
          <ResourceBreakdown breakdown={metrics.breakdown} formatSize={formatSize} />
        </div>
      )}
    </div>
  );
}

export default App;