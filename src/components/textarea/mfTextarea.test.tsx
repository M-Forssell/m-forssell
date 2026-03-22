import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MfTextarea from './mfTextarea';

describe('MfTextarea', () => {
	it('renders with label', () => {
		render(<MfTextarea label="Message" name="message" />);
		expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
	});

	it('renders with placeholder', () => {
		render(
			<MfTextarea
				label="Message"
				name="message"
				placeholder="Type your message"
			/>,
		);
		expect(
			screen.getByPlaceholderText('Type your message'),
		).toBeInTheDocument();
	});

	it('renders required indicator', () => {
		render(<MfTextarea label="Message" name="message" required />);
		expect(screen.getByLabelText(/Message/)).toBeRequired();
	});

	it('renders error message', () => {
		render(
			<MfTextarea label="Message" name="message" error="Message is required" />,
		);
		expect(screen.getByRole('alert')).toHaveTextContent('Message is required');
	});

	it('renders as a textarea element', () => {
		render(<MfTextarea label="Message" name="message" />);
		expect(screen.getByLabelText(/Message/).tagName).toBe('TEXTAREA');
	});
});
