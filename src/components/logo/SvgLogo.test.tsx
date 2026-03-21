import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SvgLogo from './SvgLogo';

// Mock the SVG import
vi.mock('@/assets/logo-light.svg', () => ({
	default: (props: Record<string, unknown>) => <svg data-testid="logo-svg" {...props} />,
}));

describe('SvgLogo', () => {
	it('renders the logo SVG', () => {
		const { container } = render(<SvgLogo />);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('passes props through to the SVG element', () => {
		const { container } = render(<SvgLogo width="90" aria-hidden="true" />);
		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('width', '90');
		expect(svg).toHaveAttribute('aria-hidden', 'true');
	});

	it('has an aria-label', () => {
		const { container } = render(<SvgLogo />);
		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('aria-label', 'Logo');
	});
});
