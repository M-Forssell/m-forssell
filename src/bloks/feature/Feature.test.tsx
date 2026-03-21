import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { FeatureBlok } from '@/types/storyblok';
import { CardVariant, CardVariants } from '@/types/componentTypes';
import Feature from './Feature';

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
	it('applies correct variant to HTag and Card', () => {
		const blokWithVariant: FeatureBlok = {
			...mockBlok,
			variant: 'underlined',
		};
		render(<Feature blok={blokWithVariant} />);
		const heading = screen.getByRole('heading', { name: 'Test Feature' });
		expect(heading).toHaveClass('h-tag--underlined');
	});

	it('applies correct variant to Card for all card variants', () => {
		const cardVariants: CardVariants[] = CardVariant
			? Object.values(CardVariant)
			: [];

		cardVariants.forEach((variant) => {
			const blokWithVariant: FeatureBlok = {
				...mockBlok,
				variant: variant,
			};
			const { getByRole, unmount } = render(<Feature blok={blokWithVariant} />);
			const card = getByRole('article');
			expect(card).toHaveClass(`mf-card--${variant}`);
			unmount();
		});
	});
});
