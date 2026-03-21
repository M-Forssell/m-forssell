import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';
import type { BaseBlok } from '@/types/storyblok';

describe('Footer Blok', () => {
	const mockBlok: BaseBlok = {
		_uid: 'footer-1',
		component: 'footer',
	};

	it('renders footer element', () => {
		render(<Footer blok={mockBlok} />);
		const footer = screen.getByText('Footer Content');
		expect(footer).toBeInTheDocument();
		expect(footer.tagName).toBe('FOOTER');
	});
});
