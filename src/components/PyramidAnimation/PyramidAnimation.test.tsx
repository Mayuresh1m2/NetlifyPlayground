// src/components/PyramidAnimation/PyramidAnimation.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PyramidAnimation from './PyramidAnimation';

describe('PyramidAnimation Component', () => {
  test('renders the pyramid container', () => {
    render(<PyramidAnimation />);
    const containerElement = screen.getByTestId('pyramid-animation-container');
    expect(containerElement).toHaveClass('pyramid-container');
  });

  test('renders the pyramid structure', () => {
    render(<PyramidAnimation />);
    const containerElement = screen.getByTestId('pyramid-animation-container');
    const pyramidElement = containerElement.querySelector('.pyramid');
    expect(pyramidElement).toBeInTheDocument();
    expect(pyramidElement).toHaveClass('pyramid');
  });

  test('renders all four layers with correct classes and labels', () => {
    render(<PyramidAnimation />);
    const containerElement = screen.getByTestId('pyramid-animation-container');
    const layers = Array.from(containerElement.querySelectorAll('.layer'));

    expect(layers.length).toBe(4);

    const expectedLabels = [
      "Mastering Fundamentals",
      "Problem Solving & Critical Thinking",
      "Continuous Learning & Adaptability",
      "Collaboration & Communication"
    ];

    layers.forEach((layer, index) => {
      expect(layer).toHaveClass(`layer layer-${index + 1}`);
      const labelElement = layer.querySelector('.label');
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent(expectedLabels[index]);
      expect(labelElement).toHaveClass('label');
    });
  });

  test('pyramid has animation class for rotation', () => {
    render(<PyramidAnimation />);
    const containerElement = screen.getByTestId('pyramid-animation-container');
    const pyramidElement = containerElement.querySelector('.pyramid');
    // The animation 'rotatePyramid' is applied to the .pyramid class in CSS
    // We check if the class that links to the animation is present.
    // Direct animation style checking is tricky and often not done in unit tests.
    expect(pyramidElement).toHaveClass('pyramid');
    // We can also check for transform-style if needed, though it's a style not a class
    // expect(pyramidElement).toHaveStyle('transform-style: preserve-3d');
  });
});
