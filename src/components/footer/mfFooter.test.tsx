import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock the Storyblok API
const { mockGet } = vi.hoisted(() => ({ mockGet: vi.fn() }));
vi.mock('@/lib/storyblok', () => ({
	getStoryblokApi: () => ({ get: mockGet }),
	getStoryblokVersion: () => 'draft',
}));

// Mock ThemeToggle since it uses client-side hooks
vi.mock('@/components/theme-toggle/theme-toggle', () => ({
	default: () => <button>Toggle Theme</button>,
}));

import MfFooter from './mfFooter';

const mockGlobalContent = {
	data: {
		story: {
			content: {
				title: 'Kontakt',
				headingLevel: 'h2',
				headingSize: 'md',
				titleSuffix: 'oss',
				email: { url: 'mailto:info@test.se', title: 'E-post' },
				phone: { url: 'tel:+46701234567', title: 'Telefon' },
				social: { url: 'https://linkedin.com', title: 'LinkedIn', target: '_blank' },
			},
		},
	},
};

describe('MfFooter', () => {
	it('renders footer with title from CMS', async () => {
		mockGet.mockResolvedValue(mockGlobalContent);

		const Component = await MfFooter();
		render(Component);

		expect(screen.getByText('Kontakt')).toBeInTheDocument();
	});

	it('renders contact links', async () => {
		mockGet.mockResolvedValue(mockGlobalContent);

		const Component = await MfFooter();
		render(Component);

		expect(screen.getByText('E-post')).toBeInTheDocument();
		expect(screen.getByText('Telefon')).toBeInTheDocument();
		expect(screen.getByText('LinkedIn')).toBeInTheDocument();
	});

	it('renders email link with correct href', async () => {
		mockGet.mockResolvedValue(mockGlobalContent);

		const Component = await MfFooter();
		const { container } = render(Component);

		const links = container.querySelectorAll('a');
		const emailLink = Array.from(links).find(
			(link) => link.getAttribute('href') === 'mailto:info@test.se',
		);
		expect(emailLink).toBeInTheDocument();
	});

	it('renders fallback title when API fails', async () => {
		mockGet.mockRejectedValue(new Error('API error'));

		const Component = await MfFooter();
		render(Component);

		expect(screen.getByText('Footer')).toBeInTheDocument();
	});

	it('renders fallback links when API fails', async () => {
		mockGet.mockRejectedValue(new Error('API error'));

		const Component = await MfFooter();
		render(Component);

		expect(screen.getByText('Email')).toBeInTheDocument();
		expect(screen.getByText('Phone')).toBeInTheDocument();
		expect(screen.getByText('Social')).toBeInTheDocument();
	});

	it('renders theme toggle in non-production', async () => {
		mockGet.mockResolvedValue(mockGlobalContent);

		const Component = await MfFooter();
		render(Component);

		expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
	});
});
