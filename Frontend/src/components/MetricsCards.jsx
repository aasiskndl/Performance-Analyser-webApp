import React from 'react';

export default function MetricsCards({ metrics, formatSize }) {
  return (
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
  );
}