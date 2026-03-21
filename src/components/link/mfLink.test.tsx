import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import MfLink from './mfLink';

describe('MfLink', () => {
	it('renders children as link text', () => {
		render(<MfLink href="/about">About Us</MfLink>);
		expect(screen.getByText('About Us')).toBeInTheDocument();
	});

	it('renders with correct href', () => {
		render(<MfLink href="/contact">Contact</MfLink>);
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', '/contact');
	});

	it('renders with target and rel attributes', () => {
		render(
			<MfLink href="/external" target="_blank" rel="noopener noreferrer">
				External
			</MfLink>,
		);
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('renders icon when provided', () => {
		const { container } = render(
			<MfLink href="mailto:test@test.com" icon={faEnvelope}>
				Email
			</MfLink>,
		);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('applies contact variant classes', () => {
		render(
			<MfLink href="mailto:test@test.com" variant="contact">
				Email
			</MfLink>,
		);
		const link = screen.getByRole('link');
		expect(link).toHaveClass('mfLink--contact');
	});

	it('shows href value for contact variant', () => {
		render(
			<MfLink href="mailto:test@test.com" variant="contact">
				Email
			</MfLink>,
		);
		expect(screen.getByText('test@test.com')).toBeInTheDocument();
	});

	it('hides value when showValue is false', () => {
		render(
			<MfLink href="mailto:test@test.com" variant="contact" showValue={false}>
				Email
			</MfLink>,
		);
		expect(screen.queryByText('test@test.com')).not.toBeInTheDocument();
	});

	it('strips tel: prefix from displayed value', () => {
		render(
			<MfLink href="tel:+46701234567" variant="contact">
				Phone
			</MfLink>,
		);
		expect(screen.getByText('+46701234567')).toBeInTheDocument();
	});
});
