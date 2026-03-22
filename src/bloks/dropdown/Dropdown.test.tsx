import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { DropdownBlok } from '@/types/storyblok';
import Dropdown from './Dropdown';

vi.mock('@storyblok/react/rsc', () => ({
	storyblokEditable: () => ({}),
}));

describe('Dropdown blok', () => {
	const mockBlok: DropdownBlok = {
		_uid: 'test-uid',
		component: 'dropdown',
		label: 'Country',
		name: 'country',
		options: 'se:Sweden\nno:Norway\ndk:Denmark',
		placeholder: 'Select a country',
	};

	it('renders the dropdown with label', () => {
		render(<Dropdown blok={mockBlok} />);
		expect(screen.getByLabelText(/Country/)).toBeInTheDocument();
	});

	it('parses and renders options', () => {
		render(<Dropdown blok={mockBlok} />);
		expect(screen.getByText('Sweden')).toBeInTheDocument();
		expect(screen.getByText('Norway')).toBeInTheDocument();
		expect(screen.getByText('Denmark')).toBeInTheDocument();
	});

	it('renders placeholder', () => {
		render(<Dropdown blok={mockBlok} />);
		expect(screen.getByText('Select a country')).toBeInTheDocument();
	});

	it('handles simple options without value:label format', () => {
		const simpleBlok: DropdownBlok = {
			...mockBlok,
			options: 'Red\nGreen\nBlue',
		};
		render(<Dropdown blok={simpleBlok} />);
		expect(screen.getByText('Red')).toBeInTheDocument();
	});
});
