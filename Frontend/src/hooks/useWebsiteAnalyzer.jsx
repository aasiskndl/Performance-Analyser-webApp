import { useState } from 'react';

export default function useWebsiteAnalyzer() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const analyzeWebsite = async (url) => {
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

  return {
    metrics,
    loading,
    error,
    analyzeWebsite
  };
}