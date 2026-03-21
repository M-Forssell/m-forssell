import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MfCard from './mfCard';

describe('MfCard', () => {
	it('renders children correctly', () => {
		render(<MfCard>Test content</MfCard>);
		expect(screen.getByText('Test content')).toBeInTheDocument();
	});

	it('applies variant className', () => {
		const { container } = render(<MfCard variant="filled">Content</MfCard>);
		const card = container.firstChild;
		expect(card).toHaveClass('mf-card');
		expect(card).toHaveClass('mf-card--filled');
	});

	it('renders without children', () => {
		const { container } = render(<MfCard>{null}</MfCard>);
		expect(container.firstChild).toBeInTheDocument();
	});
});
