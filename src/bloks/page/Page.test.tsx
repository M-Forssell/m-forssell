import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { PageBlok, FeatureBlok } from '@/types/storyblok';
import Page from './Page';

// Mock storyblokEditable and StoryblokServerComponent
vi.mock('@storyblok/react/rsc', () => ({
	storyblokEditable: () => ({}),
	StoryblokServerComponent: ({ blok }: { blok: Record<string, string> }) => (
		<div data-testid={`blok-${blok.component}`}>{blok.name}</div>
	),
}));

describe('Page', () => {
	const mockFeature: FeatureBlok = {
		_uid: 'feature-1',
		component: 'feature',
		name: 'Test Feature',
	};

	it('renders page with body content', () => {
		const mockBlok: PageBlok = {
			_uid: 'page-1',
			component: 'page',
			body: [mockFeature],
		};

		const { getByTestId } = render(<Page blok={mockBlok} />);
		expect(getByTestId('blok-feature')).toBeInTheDocument();
	});

	it('renders page without body', () => {
		const mockBlok: PageBlok = {
			_uid: 'page-1',
			component: 'page',
		};

		const { container } = render(<Page blok={mockBlok} />);
		const main = container.querySelector('main');
		expect(main).toBeInTheDocument();
		expect(main?.children).toHaveLength(0);
	});

	it('renders multiple body items', () => {
		const mockBlok: PageBlok = {
			_uid: 'page-1',
			component: 'page',
			body: [
				mockFeature,
				{ ...mockFeature, _uid: 'feature-2', name: 'Feature 2' },
			],
		};

		const { container } = render(<Page blok={mockBlok} />);
		const main = container.querySelector('main');
		expect(main?.children).toHaveLength(2);
	});
});
