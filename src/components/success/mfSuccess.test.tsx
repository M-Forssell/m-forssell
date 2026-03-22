import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MfSuccess from './mfSuccess';

describe('MfSuccess', () => {
	it('renders title', () => {
		render(<MfSuccess title="Tack för ditt meddelande!" />);
		expect(
			screen.getByRole('heading', { name: 'Tack för ditt meddelande!' }),
		).toBeInTheDocument();
	});

	it('renders rich text content', () => {
		const content = [
			{
				type: 'paragraph' as const,
				content: [{ type: 'text' as const, text: 'Vi återkommer inom 24h.' }],
			},
		];
		render(<MfSuccess title="Tack!" content={content} />);
		expect(screen.getByText('Vi återkommer inom 24h.')).toBeInTheDocument();
	});

	it('renders image when provided', () => {
		render(
			<MfSuccess
				title="Tack!"
				image={{ filename: 'https://example.com/img.jpg', alt: 'Success' }}
			/>,
		);
		expect(screen.getByAltText('Success')).toBeInTheDocument();
	});

	it('does not render image when not provided', () => {
		render(<MfSuccess title="Tack!" />);
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
	});
});
