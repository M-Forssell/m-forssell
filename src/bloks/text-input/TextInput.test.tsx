import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { TextInputBlok } from '@/types/storyblok';
import TextInput from './TextInput';

vi.mock('@storyblok/react/rsc', () => ({
	storyblokEditable: () => ({}),
}));

describe('TextInput blok', () => {
	const mockBlok: TextInputBlok = {
		_uid: 'test-uid',
		component: 'textInput',
		label: 'Email',
		name: 'email',
		type: 'email',
		placeholder: 'Enter your email',
		required: true,
	};

	it('renders the text input with label', () => {
		render(<TextInput blok={mockBlok} />);
		expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
	});

	it('renders with correct input type', () => {
		render(<TextInput blok={mockBlok} />);
		const input = screen.getByLabelText(/Email/);
		expect(input).toHaveAttribute('type', 'email');
	});

	it('renders with placeholder', () => {
		render(<TextInput blok={mockBlok} />);
		expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
	});

	it('renders with required indicator', () => {
		render(<TextInput blok={mockBlok} />);
		const input = screen.getByLabelText(/Email/);
		expect(input).toBeRequired();
	});

	it('defaults to text type when not specified', () => {
		const blokWithoutType: TextInputBlok = {
			_uid: 'test-uid',
			component: 'textInput',
			label: 'Name',
			name: 'name',
		};
		render(<TextInput blok={blokWithoutType} />);
		const input = screen.getByLabelText(/Name/);
		expect(input).toHaveAttribute('type', 'text');
	});
});
