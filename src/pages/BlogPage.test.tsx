import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import BlogPage from './BlogPage'; // The component to test

// --- Mocks ---

// Mock for import.meta.glob('../blogs/*.json') used in BlogPage.tsx
const mockBlogContentData = {
  '../blogs/IntroPost.json': {
    slug: 'IntroPost',
    title: 'Blog Test: Intro Post',
    summary: 'Summary of intro for blog test.',
    content: '# Mocked Intro Content for Blog Test',
    contentType: 'markdown',
  },
  '../blogs/SecondPost.json': {
    slug: 'SecondPost',
    title: 'Blog Test: Second Post',
    summary: 'Summary of second for blog test.',
    content: '# Mocked Second Content for Blog Test',
    contentType: 'markdown',
  },
  '../blogs/ThirdPost.json': {
    slug: 'ThirdPost',
    title: 'Blog Test: Third Post',
    summary: 'Summary of third for blog test.',
    content: '# Mocked Third Content for Blog Test',
    contentType: 'markdown',
  },
};

vi.mock('../blogs/*.json', () => {
    const modules: Record<string, () => Promise<any>> = {};
    for (const path in mockBlogContentData) {
        modules[path] = () => Promise.resolve(mockBlogContentData[path as keyof typeof mockBlogContentData]);
    }
    return modules;
});

// Mock ContentRenderer if it's complex or to simplify tests
vi.mock('../components/ContentRenderer', () => ({
    default: ({ content }: { content: string; contentType: string }) => <div data-testid="content-renderer">{content}</div>
}));


// --- Test Suite ---
describe('BlogPage Component', () => {
    beforeEach(() => {
        // IntersectionObserver might be used by MUI components within BlogPage
        const mockIntersectionObserver = vi.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn()
        });
        window.IntersectionObserver = mockIntersectionObserver;
        vi.useFakeTimers(); // BlogPage uses useEffect for data fetching, then for scroll, etc.
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    test('displays list of blog posts by default', async () => {
        render(<BlogPage />);
        // Wait for posts to load (useEffect)
        await act(async () => { vi.runAllTimers(); });

        expect(await screen.findByText('Blog Test: Intro Post')).toBeInTheDocument();
        expect(await screen.findByText('Blog Test: Second Post')).toBeInTheDocument();
        expect(screen.getByText('Summary of intro for blog test.')).toBeInTheDocument();
    });

    test('switches to single post view when "Read More" is clicked', async () => {
        render(<BlogPage />);
        await act(async () => { vi.runAllTimers(); }); // Load list

        // Find all "Read More" buttons and click the first one
        const readMoreButtons = await screen.findAllByRole('button', { name: /read more/i });
        expect(readMoreButtons.length).toBeGreaterThan(0);

        await act(async () => {
            await userEvent.click(readMoreButtons[0]);
            vi.runAllTimers(); // Allow selectedPostSlug useEffect to run
        });

        expect(await screen.findByText('# Mocked Intro Content for Blog Test')).toBeInTheDocument();
        expect(screen.getByTestId('content-renderer')).toHaveTextContent('# Mocked Intro Content for Blog Test');
        // Check that list items are gone
        expect(screen.queryByText('Blog Test: Second Post')).not.toBeInTheDocument();
    });

    test('navigates between posts using Previous/Next buttons', async () => {
        render(<BlogPage />);
        await act(async () => { vi.runAllTimers(); });

        const readMoreButtons = await screen.findAllByRole('button', { name: /read more/i });
        await act(async () => { await userEvent.click(readMoreButtons[0]); vi.runAllTimers(); }); // Click first post

        expect(await screen.findByText('# Mocked Intro Content for Blog Test')).toBeInTheDocument();

        // Navigate Next
        const nextButton = screen.getByRole('button', { name: /next/i });
        await act(async () => { await userEvent.click(nextButton); vi.runAllTimers(); });
        expect(await screen.findByText('# Mocked Second Content for Blog Test')).toBeInTheDocument();

        // Navigate Previous
        const prevButton = screen.getByRole('button', { name: /previous/i });
        await act(async () => { await userEvent.click(prevButton); vi.runAllTimers(); });
        expect(await screen.findByText('# Mocked Intro Content for Blog Test')).toBeInTheDocument();
    });

    test('returns to blog list view when "Back to Blog List" is clicked', async () => {
        render(<BlogPage />);
        await act(async () => { vi.runAllTimers(); });

        const readMoreButtons = await screen.findAllByRole('button', { name: /read more/i });
        await act(async () => { await userEvent.click(readMoreButtons[0]); vi.runAllTimers(); }); // View a post

        expect(await screen.findByText('# Mocked Intro Content for Blog Test')).toBeInTheDocument(); // Confirm single post view

        const backButton = screen.getByRole('button', { name: /back to blog list/i });
        await act(async () => { await userEvent.click(backButton); vi.runAllTimers(); });

        expect(await screen.findByText('Blog Test: Intro Post')).toBeInTheDocument(); // Back to list
        expect(await screen.findByText('Blog Test: Second Post')).toBeInTheDocument();
    });

    // Test for scroll navigation between posts (if time/complexity allows)
    test('navigates between posts using scroll', async () => {
        render(<BlogPage />);
        await act(async () => { vi.runAllTimers(); });

        const readMoreButtons = await screen.findAllByRole('button', { name: /read more/i });
        await act(async () => { await userEvent.click(readMoreButtons[0]); vi.runAllTimers(); }); // View IntroPost

        expect(await screen.findByText('# Mocked Intro Content for Blog Test')).toBeInTheDocument();

        // Scroll Right (Next)
        await act(async () => {
            fireEvent.wheel(window, { deltaX: 100 }); // Horizontal scroll
            vi.runAllTimers(); // For scroll handler and state update
        });
        expect(await screen.findByText('# Mocked Second Content for Blog Test')).toBeInTheDocument();

        // Scroll Left (Previous)
        await act(async () => {
            fireEvent.wheel(window, { deltaX: -100 }); // Horizontal scroll
            vi.runAllTimers();
        });
        expect(await screen.findByText('# Mocked Intro Content for Blog Test')).toBeInTheDocument();
    });
});
