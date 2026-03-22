import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MfTextInput from './mfTextInput';

describe('MfTextInput', () => {
	it('renders with label and input', () => {
		render(<MfTextInput label="Name" name="name" />);
		expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
	});

	it('shows optional indicator when not required', () => {
		render(<MfTextInput label="Name" name="name" />);
		expect(screen.getByText('(valfritt)')).toBeInTheDocument();
	});

	it('does not show optional indicator when required', () => {
		render(<MfTextInput label="Email" name="email" required />);
		expect(screen.queryByText('(valfritt)')).not.toBeInTheDocument();
	});

	it('renders error message', () => {
		render(<MfTextInput label="Email" name="email" error="Invalid email" />);
		expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
	});

	it('sets aria-invalid when error is present', () => {
		render(<MfTextInput label="Email" name="email" error="Required" />);
		expect(screen.getByLabelText(/Email/)).toHaveAttribute(
			'aria-invalid',
			'true',
		);
	});

	it('disables input when disabled prop is set', () => {
		render(<MfTextInput label="Name" name="name" disabled />);
		expect(screen.getByLabelText(/Name/)).toBeDisabled();
	});

	it('renders with correct input type', () => {
		render(<MfTextInput label="Email" name="email" type="email" />);
		expect(screen.getByLabelText(/Email/)).toHaveAttribute('type', 'email');
	});
});
