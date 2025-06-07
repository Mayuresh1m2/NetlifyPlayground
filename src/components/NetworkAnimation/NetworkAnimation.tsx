// NetworkAnimation.tsx
import React from 'react';
import './NetworkAnimation.css';

const NetworkAnimation: React.FC = () => {
  return (
    <div className="network-animation-container" data-testid="network-animation-container">
      <div className="node node-1"></div>
      <div className="node node-2"></div>
      <div className="node node-3"></div>
      <div className="node node-4"></div>
      <div className="node node-5"></div>
      <div className="line line-1-2"></div>
      <div className="line line-1-3"></div>
      <div className="line line-2-4"></div>
      <div className="line line-3-5"></div>
      <div className="line line-4-5"></div>
      <div className="packet packet-1"></div>
      <div className="packet packet-2"></div>
    </div>
  );
};

export default NetworkAnimation;
