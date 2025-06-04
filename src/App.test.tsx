import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import App from './App';

// --- Mock Child Components ---
vi.mock('./pages/AboutMePage', () => ({
    default: () => <div>AboutMePageMock</div>
}));
vi.mock('./pages/ContactPage', () => ({
    default: () => <div>ContactPageMock</div>
}));
vi.mock('./pages/BlogPage', () => ({
    default: () => <div>BlogPageMock</div>
}));

// --- Test Suite ---
describe('App Component Navigation with Mocked Pages and Timers', () => {
    beforeEach(() => {
        const mockIntersectionObserver = vi.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn()
        });
        window.IntersectionObserver = mockIntersectionObserver;
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    test('renders AboutMePageMock by default', async () => {
        render(<App />);
        await act(async () => {
            vi.advanceTimersByTime(350); // Transition time
        });
        // waitFor helps ensure all updates have processed after timers
        await waitFor(() => {
            expect(screen.getByText('AboutMePageMock')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    test('navigates to ContactPageMock when Contact button is clicked', async () => {
        render(<App />);
        await act(async () => { vi.advanceTimersByTime(350); });
        await waitFor(() => expect(screen.getByText('AboutMePageMock')).toBeInTheDocument(), { timeout: 1000 });

        const contactButton = screen.getByRole('button', { name: /contact/i });
        await act(async () => {
            await userEvent.click(contactButton);
            vi.advanceTimersByTime(350);
        });
        await waitFor(() => {
            expect(screen.getByText('ContactPageMock')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    test('navigates to BlogPageMock when Blog button is clicked', async () => {
        render(<App />);
        await act(async () => { vi.advanceTimersByTime(350); });
        await waitFor(() => expect(screen.getByText('AboutMePageMock')).toBeInTheDocument(), { timeout: 1000 });


        const blogButton = screen.getByRole('button', { name: /blog/i });
        await act(async () => {
            await userEvent.click(blogButton);
            vi.advanceTimersByTime(350);
        });
        await waitFor(() => {
            expect(screen.getByText('BlogPageMock')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    test('navigates to ContactPageMock on right scroll from AboutMePageMock', async () => {
        render(<App />);
        await act(async () => { vi.advanceTimersByTime(350); });
        await waitFor(() => expect(screen.getByText('AboutMePageMock')).toBeInTheDocument(), { timeout: 1000 });


        await act(async () => {
            fireEvent.wheel(window, { deltaX: 100, deltaY: 0 });
            vi.advanceTimersByTime(1050); // scroll debounce (700ms) + transition (300ms + buffer)
        });
        await waitFor(() => {
            expect(screen.getByText('ContactPageMock')).toBeInTheDocument();
        }, { timeout: 1000 }); // This timeout is for waitFor, not the test itself
    });

    test('navigates to BlogPageMock on down scroll from AboutMePageMock', async () => {
        render(<App />);
        await act(async () => { vi.advanceTimersByTime(350); });
        await waitFor(() => expect(screen.getByText('AboutMePageMock')).toBeInTheDocument(), { timeout: 1000 });

        await act(async () => {
            fireEvent.wheel(window, { deltaX: 0, deltaY: 100 });
            vi.advanceTimersByTime(1050);
        });
        await waitFor(() => {
            expect(screen.getByText('BlogPageMock')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
});
