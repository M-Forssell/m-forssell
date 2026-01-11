import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Feature from './Feature';
import type { FeatureBlok } from '@/types/storyblok';

// Mock storyblokEditable
vi.mock('@storyblok/react', () => ({
	storyblokEditable: () => ({}),
}));

describe('Feature', () => {
	const mockBlok: FeatureBlok = {
		_uid: 'test-uid',
		component: 'feature',
		name: 'Test Feature',
		content: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [
						{
							type: 'text',
							text: 'Test content',
						},
					],
				},
			],
		},
	};

	it('renders feature name', () => {
		render(<Feature blok={mockBlok} />);
		expect(screen.getByText('Test Feature')).toBeInTheDocument();
	});

	it('renders feature content', () => {
		render(<Feature blok={mockBlok} />);
		expect(screen.getByText('Test content')).toBeInTheDocument();
	});

	it('renders without content', () => {
		const blokWithoutContent: FeatureBlok = {
			...mockBlok,
			content: undefined,
		};
		render(<Feature blok={blokWithoutContent} />);
		expect(screen.getByText('Test Feature')).toBeInTheDocument();
	});
});
