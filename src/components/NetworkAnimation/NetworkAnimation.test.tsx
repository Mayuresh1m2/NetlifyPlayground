// src/components/NetworkAnimation/NetworkAnimation.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NetworkAnimation from './NetworkAnimation';

describe('NetworkAnimation Component', () => {
  test('renders the network animation container', () => {
    render(<NetworkAnimation />);
    const containerElement = screen.getByTestId('network-animation-container');
    expect(containerElement).toHaveClass('network-animation-container');
  });

  test('renders the correct number of nodes with base class', () => {
    render(<NetworkAnimation />);
    const containerElement = screen.getByTestId('network-animation-container');
    const nodeElements = containerElement.querySelectorAll('.node');
    expect(nodeElements.length).toBe(5);
    nodeElements.forEach(node => {
      expect(node).toHaveClass('node');
    });
  });

  test('renders specific nodes with their individual classes', () => {
    render(<NetworkAnimation />);
    const containerElement = screen.getByTestId('network-animation-container');
    expect(containerElement.querySelector('.node-1')).toBeInTheDocument();
    expect(containerElement.querySelector('.node-2')).toBeInTheDocument();
    expect(containerElement.querySelector('.node-3')).toBeInTheDocument();
    expect(containerElement.querySelector('.node-4')).toBeInTheDocument();
    expect(containerElement.querySelector('.node-5')).toBeInTheDocument();
  });

  test('renders lines with base class', () => {
    render(<NetworkAnimation />);
    const containerElement = screen.getByTestId('network-animation-container');
    const lineElements = containerElement.querySelectorAll('.line');
    // Based on NetworkAnimation.tsx, there are 5 lines
    expect(lineElements.length).toBe(5);
    lineElements.forEach(line => {
      expect(line).toHaveClass('line');
    });
  });

   test('renders specific lines with their individual classes', () => {
    render(<NetworkAnimation />);
    const containerElement = screen.getByTestId('network-animation-container');
    expect(containerElement.querySelector('.line-1-2')).toBeInTheDocument();
    expect(containerElement.querySelector('.line-1-3')).toBeInTheDocument();
    // Add checks for other lines if their specific classes are important for testing
  });


  test('renders packets with base class and animation classes', () => {
    render(<NetworkAnimation />);
    const containerElement = screen.getByTestId('network-animation-container');
    const packetElements = containerElement.querySelectorAll('.packet');
    expect(packetElements.length).toBe(2);

    const packet1 = containerElement.querySelector('.packet-1');
    expect(packet1).toBeInTheDocument();
    expect(packet1).toHaveClass('packet'); // Base class

    const packet2 = containerElement.querySelector('.packet-2');
    expect(packet2).toBeInTheDocument();
    expect(packet2).toHaveClass('packet');
  });

  test('network container has overflow hidden style', () => {
    render(<NetworkAnimation />);
    const containerElement = screen.getByTestId('network-animation-container');
    expect(containerElement).toHaveStyle('overflow: hidden');
  });
});
