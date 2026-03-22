import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { CheckboxBlok } from '@/types/storyblok';
import Checkbox from './Checkbox';

vi.mock('@storyblok/react/rsc', () => ({
	storyblokEditable: () => ({}),
}));

describe('Checkbox blok', () => {
	const mockBlok: CheckboxBlok = {
		_uid: 'test-uid',
		component: 'checkbox',
		label: 'Accept terms',
		name: 'terms',
		required: true,
	};

	it('renders the checkbox with label', () => {
		render(<Checkbox blok={mockBlok} />);
		expect(screen.getByLabelText(/Accept terms/)).toBeInTheDocument();
	});

	it('renders as a checkbox', () => {
		render(<Checkbox blok={mockBlok} />);
		expect(screen.getByRole('checkbox')).toBeInTheDocument();
	});

	it('renders with required', () => {
		render(<Checkbox blok={mockBlok} />);
		expect(screen.getByRole('checkbox')).toBeRequired();
	});

	it('renders without required when not set', () => {
		const optionalBlok: CheckboxBlok = {
			...mockBlok,
			required: undefined,
		};
		render(<Checkbox blok={optionalBlok} />);
		expect(screen.getByRole('checkbox')).not.toBeRequired();
	});
});
