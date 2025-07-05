// src/components/ResourceBreakdown.jsx
import React from 'react';

export default function ResourceBreakdown({ breakdown, formatSize }) {
  if (!breakdown) return null;
  
  const breakdownItems = Object.entries(breakdown)
    .filter(([_, info]) => info.size > 0)
    .sort((a, b) => b[1].size - a[1].size);

  return (
    <div className="breakdown">
      <h3>Resource Breakdown</h3>
      <div className="breakdown-grid">
        {breakdownItems.map(([type, info]) => (
          <div key={type} className="breakdown-item">
            <span className="type">{type}</span>
            <span className="size">{formatSize(info.size)}</span>
            <span className="count">{info.count} requests</span>
          </div>
        ))}
      </div>
    </div>
  );
}