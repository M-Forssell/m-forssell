import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MfFooter from './mfFooter';

// Mock the Storyblok API
const { mockGet } = vi.hoisted(() => ({ mockGet: vi.fn() }));
vi.mock('@/lib/storyblok', () => ({
	getStoryblokApi: () => ({ get: mockGet }),
	getStoryblokVersion: () => 'draft',
}));

// Mock storyblokEditable (used by Link blok)
vi.mock('@storyblok/react/rsc', () => ({
	storyblokEditable: () => ({}),
}));

// Mock ThemeToggle since it uses client-side hooks
vi.mock('@/components/theme-toggle/theme-toggle', () => ({
	default: () => <button>Toggle Theme</button>,
}));

const mockFooterContent = {
	data: {
		story: {
			content: {
				links: [
					{
						_uid: 'link-1',
						component: 'link',
						label: 'E-post',
						link: {
							url: 'mailto:info@test.se',
							linktype: 'url',
							cached_url: '',
						},
						variant: 'contact',
						icon: 'envelope',
					},
					{
						_uid: 'link-2',
						component: 'link',
						label: 'Telefon',
						link: { url: 'tel:+46701234567', linktype: 'url', cached_url: '' },
						variant: 'contact',
						icon: 'phone',
					},
					{
						_uid: 'link-3',
						component: 'link',
						label: 'LinkedIn',
						link: {
							url: 'https://linkedin.com',
							linktype: 'url',
							cached_url: '',
							target: '_blank',
						},
						variant: 'contact',
						icon: 'linkedin',
					},
				],
			},
		},
	},
};

describe('MfFooter', () => {
	it('renders contact links from link bloks', async () => {
		mockGet.mockResolvedValue(mockFooterContent);

		const Component = await MfFooter();
		render(Component);

		expect(screen.getByText('E-post')).toBeInTheDocument();
		expect(screen.getByText('Telefon')).toBeInTheDocument();
		expect(screen.getByText('LinkedIn')).toBeInTheDocument();
	});

	it('renders email link with correct href', async () => {
		mockGet.mockResolvedValue(mockFooterContent);

		const Component = await MfFooter();
		const { container } = render(Component);

		const links = container.querySelectorAll('a');
		const emailLink = Array.from(links).find(
			(link) => link.getAttribute('href') === 'mailto:info@test.se',
		);
		expect(emailLink).toBeInTheDocument();
	});

	it('renders empty footer when API fails', async () => {
		mockGet.mockRejectedValue(new Error('API error'));

		const Component = await MfFooter();
		const { container } = render(Component);

		expect(container.querySelector('footer')).toBeInTheDocument();
		expect(container.querySelectorAll('a')).toHaveLength(0);
	});

	it('renders theme toggle in non-production', async () => {
		mockGet.mockResolvedValue(mockFooterContent);

		const Component = await MfFooter();
		render(Component);

		expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
	});
});
