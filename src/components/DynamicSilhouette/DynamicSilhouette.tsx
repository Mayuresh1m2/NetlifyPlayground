// DynamicSilhouette.tsx
import React from 'react';
import './DynamicSilhouette.css';

const DynamicSilhouette: React.FC = () => {
  return (
    <div className="silhouette-container" data-testid="dynamic-silhouette-container">
      <div className="silhouette">
        <div className="head"></div>
        <div className="body"></div>
        <div className="arm arm-left"></div>
        <div className="arm arm-right"></div>
        <div className="leg leg-left"></div>
        <div className="leg leg-right"></div>
      </div>
    </div>
  );
};

export default DynamicSilhouette;
