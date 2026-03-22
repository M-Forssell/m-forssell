import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MfCheckbox from './mfCheckbox';

describe('MfCheckbox', () => {
	it('renders with label', () => {
		render(<MfCheckbox label="Accept terms" name="terms" />);
		expect(screen.getByLabelText(/Accept terms/)).toBeInTheDocument();
	});

	it('renders as a checkbox', () => {
		render(<MfCheckbox label="Accept terms" name="terms" />);
		expect(screen.getByRole('checkbox')).toBeInTheDocument();
	});

	it('renders required indicator', () => {
		render(<MfCheckbox label="Accept terms" name="terms" required />);
		expect(screen.getByRole('checkbox')).toBeRequired();
	});

	it('renders error message', () => {
		render(
			<MfCheckbox
				label="Accept terms"
				name="terms"
				error="You must accept the terms"
			/>,
		);
		expect(screen.getByRole('alert')).toHaveTextContent(
			'You must accept the terms',
		);
	});

	it('renders disabled state', () => {
		render(<MfCheckbox label="Accept terms" name="terms" disabled />);
		expect(screen.getByRole('checkbox')).toBeDisabled();
	});
});
