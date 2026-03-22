import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { BaseBlok } from '@/types/storyblok';
import Footer from './Footer';

vi.mock('@/components/footer/mfFooter', () => ({
	default: () => <footer>Mocked Footer</footer>,
}));

vi.mock('@storyblok/react/rsc', () => ({
	storyblokEditable: () => ({}),
}));

describe('Footer Blok', () => {
	const mockBlok: BaseBlok = {
		_uid: 'footer-1',
		component: 'footer',
	};

	it('renders footer element', () => {
		const { container } = render(<Footer blok={mockBlok} />);
		const footer = container.querySelector('footer');
		expect(footer).toBeInTheDocument();
	});
});
