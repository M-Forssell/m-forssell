import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Grid from './Grid';
import type { GridBlok, TeaserBlok } from '@/types/storyblok';

// Mock the teaser component
vi.mock('@/bloks/teaser', () => ({
	default: ({ blok }: { blok: any }) => (
		<div data-testid="teaser">{blok.headline}</div>
	),
}));

// Mock storyblokEditable and StoryblokComponent
vi.mock('@storyblok/react', () => ({
	storyblokEditable: () => ({}),
	StoryblokComponent: ({ blok }: { blok: any }) => (
		<div data-testid={`component-${blok.component}`}>{blok.headline}</div>
	),
}));

describe('Grid', () => {
	const mockTeaser: TeaserBlok = {
		_uid: 'teaser-1',
		component: 'teaser',
		headline: 'Test Teaser',
	};

	const mockBlok: GridBlok = {
		_uid: 'grid-uid',
		component: 'grid',
		columns: [mockTeaser],
	};

	it('renders grid with columns', () => {
		const { container } = render(<Grid blok={mockBlok} />);
		const section = container.querySelector('section');
		expect(section).toBeInTheDocument();
		expect(section).toHaveClass('mfGrid');
	});

	it('renders multiple columns', () => {
		const multiColumnBlok: GridBlok = {
			...mockBlok,
			columns: [
				mockTeaser,
				{ ...mockTeaser, _uid: 'teaser-2', headline: 'Second Teaser' },
			],
		};
		const { container } = render(<Grid blok={multiColumnBlok} />);
		const section = container.querySelector('section');
		expect(section?.children).toHaveLength(2);
	});
});
