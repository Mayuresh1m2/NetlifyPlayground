// PyramidAnimation.tsx
import React from 'react';
import './PyramidAnimation.css';

const PyramidAnimation: React.FC = () => {
  return (
    <div className="new-pyramid-container" data-testid="pyramid-animation-container">
      <div className="pyramid-layer layer-architecture">
        <span className="layer-title">Architectural Styles & Patterns</span>
      </div>
      <div className="pyramid-layer layer-design-patterns">
        <span className="layer-title">Design Patterns</span>
      </div>
      <div className="pyramid-layer layer-dev-principles">
        <span className="layer-title">Development Principles</span>
      </div>
      <div className="pyramid-layer layer-fundamentals">
        <span className="layer-title">Fundamentals</span>
      </div>
    </div>
  );
};

export default PyramidAnimation;
