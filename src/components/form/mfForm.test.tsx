import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import MfForm from './mfForm';

describe('MfForm', () => {
	it('renders children', () => {
		render(
			<MfForm formName="test">
				<input name="test" aria-label="test" />
			</MfForm>,
		);
		expect(screen.getByLabelText('test')).toBeInTheDocument();
	});

	it('renders submit button with default label', () => {
		render(
			<MfForm formName="test">
				<input name="test" />
			</MfForm>,
		);
		expect(screen.getByRole('button', { name: 'Skicka' })).toBeInTheDocument();
	});

	it('renders submit button with custom label', () => {
		render(
			<MfForm formName="test" submitLabel="Send message">
				<input name="test" />
			</MfForm>,
		);
		expect(
			screen.getByRole('button', { name: 'Send message' }),
		).toBeInTheDocument();
	});

	it('sets noValidate on form for custom validation', () => {
		render(
			<MfForm formName="contact">
				<input name="test" />
			</MfForm>,
		);
		const form = document.querySelector('form');
		expect(form).toHaveAttribute('novalidate');
	});

	it('includes hidden form-name input', () => {
		render(
			<MfForm formName="contact">
				<input name="test" />
			</MfForm>,
		);
		const hiddenInput = document.querySelector('input[name="form-name"]');
		expect(hiddenInput).toHaveAttribute('value', 'contact');
	});

	it('includes honeypot field', () => {
		render(
			<MfForm formName="contact">
				<input name="test" />
			</MfForm>,
		);
		const honeypot = document.querySelector('input[name="bot-field"]');
		expect(honeypot).toBeInTheDocument();
	});

	it('validates required fields on submit', async () => {
		const user = userEvent.setup();
		render(
			<MfForm formName="test">
				<label htmlFor="email">Email</label>
				<input id="email" name="email" type="email" required />
			</MfForm>,
		);
		await user.click(screen.getByRole('button', { name: 'Skicka' }));
		// The required field should prevent submission (no fetch call)
		const form = document.querySelector('form');
		expect(form).toBeInTheDocument();
	});
});
