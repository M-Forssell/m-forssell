import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Teaser from './Teaser';
import type { TeaserBlok } from '@/types/storyblok';

// Mock storyblokEditable
vi.mock('@storyblok/react/rsc', () => ({
	storyblokEditable: () => ({}),
}));

describe('Teaser', () => {
	const mockBlok: TeaserBlok = {
		_uid: 'teaser-1',
		component: 'teaser',
		headline: 'Test Teaser',
		content: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'Teaser content',
						},
					],
				},
			],
		},
	};

	it('renders teaser headline', () => {
		render(<Teaser blok={mockBlok} />);
		expect(screen.getByText('Test Teaser')).toBeInTheDocument();
	});

	it('renders teaser content', () => {
		render(<Teaser blok={mockBlok} />);
		expect(screen.getByText('Teaser content')).toBeInTheDocument();
	});

	it('renders without content', () => {
		const blokWithoutContent: TeaserBlok = {
			...mockBlok,
			content: undefined,
		};
		render(<Teaser blok={blokWithoutContent} />);
		expect(screen.getByText('Test Teaser')).toBeInTheDocument();
	});

	it('renders in a card with outlined variant', () => {
		const { container } = render(<Teaser blok={mockBlok} />);
		const article = container.querySelector('article');
		expect(article).toBeInTheDocument();
		expect(article).toHaveClass('mf-card--outlined');
	});
});
