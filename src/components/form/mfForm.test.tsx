import { render, screen } from '@testing-library/react';
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
		expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
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

	it('renders success message', () => {
		render(
			<MfForm formName="test" successMessage="Form submitted!">
				<input name="test" />
			</MfForm>,
		);
		expect(screen.getByRole('status')).toHaveTextContent('Form submitted!');
	});

	it('renders error message', () => {
		render(
			<MfForm formName="test" errorMessage="Something went wrong">
				<input name="test" />
			</MfForm>,
		);
		expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
	});

	it('sets data-netlify attribute', () => {
		render(
			<MfForm formName="contact">
				<input name="test" />
			</MfForm>,
		);
		const form = document.querySelector('form');
		expect(form).toHaveAttribute('data-netlify', 'true');
		expect(form).toHaveAttribute('name', 'contact');
		expect(form).toHaveAttribute('method', 'POST');
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
});
