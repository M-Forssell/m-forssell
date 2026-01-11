import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MfGrid from './mfGrid';

describe('MfGrid', () => {
	it('renders children correctly', () => {
		const { container } = render(
			<MfGrid>
				<div>Child 1</div>
				<div>Child 2</div>
			</MfGrid>,
		);
		const section = container.querySelector('section');
		expect(section).toBeInTheDocument();
		expect(section).toHaveClass('mfGrid');
	});

	it('renders multiple children', () => {
		const { container } = render(
			<MfGrid>
				<div>Item 1</div>
				<div>Item 2</div>
				<div>Item 3</div>
			</MfGrid>,
		);
		const section = container.querySelector('section');
		expect(section?.children).toHaveLength(3);
	});

	it('renders without children', () => {
		const { container } = render(<MfGrid>{null}</MfGrid>);
		const section = container.querySelector('section');
		expect(section).toBeInTheDocument();
	});
});
