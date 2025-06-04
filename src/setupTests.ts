// React Testing Library matchers
import '@testing-library/jest-dom';

// You can add other global setup here if needed
// For example, mocking global objects or functions

// Example of mocking a global function (if needed for your components)
/*
vi.mock('some-module', () => ({
  someFunction: vi.fn(() => 'mocked value'),
}));
*/

// Clean up after each test if using msw or similar
/*
import { server } from './mocks/server'; // if you use msw
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
*/
