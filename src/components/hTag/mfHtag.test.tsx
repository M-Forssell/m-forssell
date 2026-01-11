import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MfHtag from './mfHtag';

describe('MfHtag', () => {
	it('renders with default props', () => {
		const { container } = render(<MfHtag>Test Heading</MfHtag>);
		const heading = container.querySelector('h2');
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveClass('h-tag');
		expect(heading).toHaveClass('h-tag--md');
	});

	it('renders with custom tag', () => {
		const { container } = render(<MfHtag tag="h1">H1 Heading</MfHtag>);
		const heading = container.querySelector('h1');
		expect(heading).toBeInTheDocument();
	});

	it('renders with custom size', () => {
		const { container } = render(<MfHtag size="lg">Large Heading</MfHtag>);
		const heading = container.querySelector('h2');
		expect(heading).toHaveClass('h-tag--lg');
	});

	it('renders with variant', () => {
		const { container } = render(
			<MfHtag variant="underlined">Underlined Heading</MfHtag>,
		);
		const heading = container.querySelector('h2');
		expect(heading).toHaveClass('h-tag--underlined');
	});

	it('renders all heading levels', () => {
		const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
		levels.forEach((tag) => {
			const { container } = render(<MfHtag tag={tag}>Heading</MfHtag>);
			const heading = container.querySelector(tag);
			expect(heading).toBeInTheDocument();
		});
	});

	it('renders children in span', () => {
		const { container } = render(<MfHtag>Test Content</MfHtag>);
		const span = container.querySelector('span');
		expect(span).toBeInTheDocument();
		expect(span).toHaveTextContent('Test Content');
	});
});
