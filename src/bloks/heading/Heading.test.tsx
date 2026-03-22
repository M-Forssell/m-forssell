import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Heading from './Heading';
import type { HeadingBlok } from './Heading';

const createMockBlok = (overrides: Partial<HeadingBlok> = {}): HeadingBlok => ({
	_uid: 'heading-1',
	component: 'heading',
	title: 'Test Heading',
	level: 'h2',
	...overrides,
});

describe('Heading', () => {
	it('renders with h2 level', () => {
		const { container } = render(<Heading blok={createMockBlok()} />);
		const heading = container.querySelector('h2');
		expect(heading).toBeInTheDocument();
		expect(screen.getByText('Test Heading')).toBeInTheDocument();
	});

	it('renders with h1 level', () => {
		const { container } = render(
			<Heading blok={createMockBlok({ title: 'Main Title', level: 'h1' })} />,
		);
		const heading = container.querySelector('h1');
		expect(heading).toBeInTheDocument();
	});

	it('renders with h3 level', () => {
		const { container } = render(
			<Heading blok={createMockBlok({ title: 'Subtitle', level: 'h3' })} />,
		);
		const heading = container.querySelector('h3');
		expect(heading).toBeInTheDocument();
	});

	it('renders with large size', () => {
		const { container } = render(
			<Heading blok={createMockBlok({ title: 'Large Heading' })} />,
		);
		const heading = container.querySelector('h2');
		expect(heading).toHaveClass('h-tag--lg');
	});

	it('renders all heading levels', () => {
		const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
		levels.forEach((level) => {
			const { container } = render(
				<Heading
					blok={createMockBlok({
						_uid: `heading-${level}`,
						title: `Title ${level}`,
						level,
					})}
				/>,
			);
			const heading = container.querySelector(level);
			expect(heading).toBeInTheDocument();
		});
	});
});
