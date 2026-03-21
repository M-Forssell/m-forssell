import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MfHeader from './mfHeader';

// Mock the Storyblok API
const { mockGet } = vi.hoisted(() => ({ mockGet: vi.fn() }));
vi.mock('@/lib/storyblok', () => ({
	getStoryblokApi: () => ({ get: mockGet }),
	getStoryblokVersion: () => 'draft',
}));

// Mock the SvgLogo component
vi.mock('@/components/logo/SvgLogo', () => ({
	default: (props: Record<string, unknown>) => (
		<svg data-testid="logo" {...props} />
	),
}));

describe('MfHeader', () => {
	it('renders header with logo and fallback link', async () => {
		mockGet.mockResolvedValue({
			data: {
				story: {
					content: {
						homeLink: { cached_url: '/' },
					},
				},
			},
		});

		const Component = await MfHeader();
		const { container } = render(Component);

		expect(container.querySelector('header')).toBeInTheDocument();
		expect(container.querySelector('svg')).toBeInTheDocument();
		const link = container.querySelector('a');
		expect(link).toHaveAttribute('href', '/');
	});

	it('renders header title from CMS content', async () => {
		mockGet.mockResolvedValue({
			data: {
				story: {
					content: {
						homeLink: { cached_url: '/' },
						headerTitle: {
							type: 'doc',
							content: [
								{
									type: 'paragraph',
									content: [{ type: 'text', text: 'Säkerhetskonsult' }],
								},
							],
						},
					},
				},
			},
		});

		const Component = await MfHeader();
		render(Component);

		expect(screen.getByText('Säkerhetskonsult')).toBeInTheDocument();
	});

	it('renders with fallback aria-label when no title', async () => {
		mockGet.mockResolvedValue({
			data: {
				story: {
					content: {
						homeLink: { cached_url: '/' },
					},
				},
			},
		});

		const Component = await MfHeader();
		const { container } = render(Component);

		const link = container.querySelector('a');
		expect(link).toHaveAttribute('aria-label', 'M Forssell — Home');
	});

	it('handles API error gracefully', async () => {
		mockGet.mockRejectedValue(new Error('API error'));

		const Component = await MfHeader();
		const { container } = render(Component);

		expect(container.querySelector('header')).toBeInTheDocument();
		const link = container.querySelector('a');
		expect(link).toHaveAttribute('href', '/');
	});
});
