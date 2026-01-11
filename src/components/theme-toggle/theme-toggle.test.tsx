import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeToggle from './theme-toggle';

// Mock useTheme hook
vi.mock('@/hooks/useTheme', () => ({
	useTheme: () => ({
		theme: 'light',
		toggleTheme: vi.fn(),
		mounted: true,
	}),
}));

describe('ThemeToggle', () => {
	it('renders theme toggle button when mounted', () => {
		render(<ThemeToggle />);
		const button = screen.getByRole('button', { name: /switch to dark mode/i });
		expect(button).toBeInTheDocument();
	});

	it('displays correct emoji for light theme', () => {
		render(<ThemeToggle />);
		expect(screen.getByText('🌙')).toBeInTheDocument();
	});
});
