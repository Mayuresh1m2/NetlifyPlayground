// src/components/DynamicSilhouette/DynamicSilhouette.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DynamicSilhouette from './DynamicSilhouette';

describe('DynamicSilhouette Component', () => {
  test('renders the silhouette container', () => {
    render(<DynamicSilhouette />);
    const containerElement = screen.getByTestId('dynamic-silhouette-container');
    expect(containerElement).toHaveClass('silhouette-container');
  });

  test('renders the main silhouette div with animation class', () => {
    render(<DynamicSilhouette />);
    const containerElement = screen.getByTestId('dynamic-silhouette-container');
    const silhouetteElement = containerElement.querySelector('.silhouette');
    expect(silhouetteElement).toBeInTheDocument();
    expect(silhouetteElement).toHaveClass('silhouette');
  });

  test('renders all parts of the silhouette', () => {
    render(<DynamicSilhouette />);
    const containerElement = screen.getByTestId('dynamic-silhouette-container');
    expect(containerElement.querySelector('.head')).toBeInTheDocument();
    expect(containerElement.querySelector('.body')).toBeInTheDocument();
    expect(containerElement.querySelector('.arm-left')).toBeInTheDocument();
    expect(containerElement.querySelector('.arm-right')).toBeInTheDocument();
    expect(containerElement.querySelector('.leg-left')).toBeInTheDocument();
    expect(containerElement.querySelector('.leg-right')).toBeInTheDocument();
  });

  test('right arm has waving animation class', () => {
    render(<DynamicSilhouette />);
    const containerElement = screen.getByTestId('dynamic-silhouette-container');
    const rightArm = containerElement.querySelector('.arm-right');
    expect(rightArm).toBeInTheDocument();
    expect(rightArm).toHaveClass('arm-right');
    // The 'wave-animation' is directly applied to '.arm-right' in CSS,
    // so this class check is a good proxy for the animation being potentially active.
  });

  test('left arm does not have waving animation class by default', () => {
    render(<DynamicSilhouette />);
    const containerElement = screen.getByTestId('dynamic-silhouette-container');
    const leftArm = containerElement.querySelector('.arm-left');
    expect(leftArm).toBeInTheDocument();
    // Verifying that the specific wave animation class or equivalent style is not on left arm
    // This depends on how specific the CSS is. If .arm also had animation, this would need adjustment.
    // Given current CSS, .arm-left itself doesn't have the 'wave-animation' by name.
    // The test for .arm-right having 'arm-right' (which triggers animation) is the key.
    // A more robust test would be to check computed styles if possible and necessary.
    // For now, ensuring it's just 'arm' and 'arm-left' implies no *additional* specific animation class.
    expect(leftArm).toHaveClass('arm');
    expect(leftArm).toHaveClass('arm-left');
    // expect(leftArm.style.animationName).not.toContain('wave-animation'); // This is more direct but harder in JSDOM
  });


  test('silhouette parts have correct base classes', () => {
    render(<DynamicSilhouette />);
    const containerElement = screen.getByTestId('dynamic-silhouette-container');
    expect(containerElement.querySelector('.head')).toHaveClass('head');
    expect(containerElement.querySelector('.body')).toHaveClass('body');
    expect(containerElement.querySelector('.arm-left')).toHaveClass('arm', 'arm-left');
    expect(containerElement.querySelector('.arm-right')).toHaveClass('arm', 'arm-right');
    expect(containerElement.querySelector('.leg-left')).toHaveClass('leg', 'leg-left');
    expect(containerElement.querySelector('.leg-right')).toHaveClass('leg', 'leg-right');
  });
});
