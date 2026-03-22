import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { SuccessBlok } from '@/types/storyblok';
import Success from './Success';

vi.mock('@storyblok/react/rsc', () => ({
	storyblokEditable: () => ({}),
}));

describe('Success blok', () => {
	const mockBlok: SuccessBlok = {
		_uid: 'success-uid',
		component: 'success',
		title: 'Tack för ditt meddelande!',
		content: {
			type: 'doc',
			content: [
				{
					type: 'paragraph',
					content: [{ type: 'text', text: 'Vi hör av oss snart.' }],
				},
			],
		},
	};

	it('renders title', () => {
		render(<Success blok={mockBlok} />);
		expect(
			screen.getByRole('heading', { name: 'Tack för ditt meddelande!' }),
		).toBeInTheDocument();
	});

	it('renders content', () => {
		render(<Success blok={mockBlok} />);
		expect(screen.getByText('Vi hör av oss snart.')).toBeInTheDocument();
	});

	it('renders without image', () => {
		render(<Success blok={mockBlok} />);
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
	});

	it('renders with image', () => {
		const blokWithImage: SuccessBlok = {
			...mockBlok,
			image: {
				id: 1,
				alt: 'Success illustration',
				name: 'success.jpg',
				focus: null,
				title: null,
				source: null,
				filename: 'https://example.com/success.jpg',
				copyright: null,
				fieldtype: 'asset',
				meta_data: {},
			},
		};
		render(<Success blok={blokWithImage} />);
		expect(screen.getByAltText('Success illustration')).toBeInTheDocument();
	});
});
