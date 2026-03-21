import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from './icon';

describe('Icon', () => {
	it('renders an icon for a valid icon name', () => {
		const { container } = render(
			<Icon iconName="building-shield" />,
		);
		const span = container.querySelector('.mf-icon');
		expect(span).toBeInTheDocument();
		expect(span?.querySelector('svg')).toBeInTheDocument();
	});

	it('applies custom className', () => {
		const { container } = render(
			<Icon iconName="shield" className="custom-class" />,
		);
		const span = container.querySelector('.mf-icon');
		expect(span).toHaveClass('custom-class');
	});

	it('renders different icon names', () => {
		const iconNames = [
			'shop-lock',
			'heart-pulse',
			'graduation-cap',
			'magnifying-glass',
			'handshake',
			'shield-halved',
			'arrow-trend-up',
			'clapperboard',
		] as const;

		iconNames.forEach((name) => {
			const { container, unmount } = render(<Icon iconName={name} />);
			expect(container.querySelector('svg')).toBeInTheDocument();
			unmount();
		});
	});
});
