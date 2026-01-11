import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Heading from './Heading';

describe('Heading', () => {
	it('renders with h2 level', () => {
		const mockBlok = {
			_uid: 'heading-1',
			title: 'Test Heading',
			level: 'h2' as const,
		};

		const { container } = render(<Heading blok={mockBlok} />);
		const heading = container.querySelector('h2');
		expect(heading).toBeInTheDocument();
		expect(screen.getByText('Test Heading')).toBeInTheDocument();
	});

	it('renders with h1 level', () => {
		const mockBlok = {
			_uid: 'heading-1',
			title: 'Main Title',
			level: 'h1' as const,
		};

		const { container } = render(<Heading blok={mockBlok} />);
		const heading = container.querySelector('h1');
		expect(heading).toBeInTheDocument();
	});

	it('renders with h3 level', () => {
		const mockBlok = {
			_uid: 'heading-1',
			title: 'Subtitle',
			level: 'h3' as const,
		};

		const { container } = render(<Heading blok={mockBlok} />);
		const heading = container.querySelector('h3');
		expect(heading).toBeInTheDocument();
	});

	it('renders with large size', () => {
		const mockBlok = {
			_uid: 'heading-1',
			title: 'Large Heading',
			level: 'h2' as const,
		};

		const { container } = render(<Heading blok={mockBlok} />);
		const heading = container.querySelector('h2');
		expect(heading).toHaveClass('h-tag--lg');
	});

	it('renders all heading levels', () => {
		const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
		levels.forEach((level) => {
			const mockBlok = {
				_uid: `heading-${level}`,
				title: `Title ${level}`,
				level,
			};
			const { container } = render(<Heading blok={mockBlok} />);
			const heading = container.querySelector(level);
			expect(heading).toBeInTheDocument();
		});
	});
});
