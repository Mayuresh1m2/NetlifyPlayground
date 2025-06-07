// src/components/PyramidAnimation/PyramidAnimation.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PyramidAnimation from './PyramidAnimation';

describe('PyramidAnimation Component (Redesigned)', () => {
  test('renders the new pyramid container', () => {
    render(<PyramidAnimation />);
    const containerElement = screen.getByTestId('pyramid-animation-container');
    expect(containerElement).toHaveClass('new-pyramid-container');
  });

  test('renders all four layers with correct classes and new labels', () => {
    render(<PyramidAnimation />);
    const containerElement = screen.getByTestId('pyramid-animation-container');

    const expectedLayers = [
      { class: 'layer-architecture', label: 'Architectural Styles & Patterns' },
      { class: 'layer-design-patterns', label: 'Design Patterns' },
      { class: 'layer-dev-principles', label: 'Development Principles' },
      { class: 'layer-fundamentals', label: 'Fundamentals' },
    ];

    expectedLayers.forEach(layerInfo => {
      // Find layer by its specific class within the container
      const layerElement = containerElement.querySelector(`.${layerInfo.class}`);
      expect(layerElement).toBeInTheDocument();
      expect(layerElement).toHaveClass('pyramid-layer'); // Check for base class

      // Find title within the layer
      const labelElement = layerElement?.querySelector('.layer-title');
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent(layerInfo.label);
    });
  });

  test('verifies the order of layers visually (top to bottom in code, top to bottom on screen)', () => {
    render(<PyramidAnimation />);
    const containerElement = screen.getByTestId('pyramid-animation-container');
    const layers = containerElement.querySelectorAll('.pyramid-layer');

    expect(layers.length).toBe(4);

    // Check class names to infer order as defined in TSX
    expect(layers[0]).toHaveClass('layer-architecture');
    expect(layers[1]).toHaveClass('layer-design-patterns');
    expect(layers[2]).toHaveClass('layer-dev-principles');
    expect(layers[3]).toHaveClass('layer-fundamentals');
  });

  test('does not have the old 3D rotation animation class', () => {
    render(<PyramidAnimation />);
    const containerElement = screen.getByTestId('pyramid-animation-container');
    const oldPyramidElement = containerElement.querySelector('.pyramid'); // Old selector
    expect(oldPyramidElement).not.toBeInTheDocument();

    // Also check if any element has the 'rotatePyramid' class if it was applied elsewhere
    // This is a bit more general but confirms no residue of old animation class names.
    const animatedElements = containerElement.querySelectorAll('[class*="rotatePyramid"]');
    expect(animatedElements.length).toBe(0);
  });
});
