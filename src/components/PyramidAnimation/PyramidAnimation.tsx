// PyramidAnimation.tsx
import React from 'react';
import './PyramidAnimation.css';

const PyramidAnimation: React.FC = () => {
  return (
    <div className="pyramid-container" data-testid="pyramid-animation-container">
      <div className="pyramid">
        <div className="layer layer-1">
          <span className="label">Mastering Fundamentals</span>
        </div>
        <div className="layer layer-2">
          <span className="label">Problem Solving & Critical Thinking</span>
        </div>
        <div className="layer layer-3">
          <span className="label">Continuous Learning & Adaptability</span>
        </div>
        <div className="layer layer-4">
          <span className="label">Collaboration & Communication</span>
        </div>
      </div>
    </div>
  );
};

export default PyramidAnimation;
