import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { TextareaBlok } from '@/types/storyblok';
import Textarea from './Textarea';

vi.mock('@storyblok/react/rsc', () => ({
	storyblokEditable: () => ({}),
}));

describe('Textarea blok', () => {
	const mockBlok: TextareaBlok = {
		_uid: 'test-uid',
		component: 'textarea',
		label: 'Message',
		name: 'message',
		placeholder: 'Type your message',
		required: true,
	};

	it('renders the textarea with label', () => {
		render(<Textarea blok={mockBlok} />);
		expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
	});

	it('renders with placeholder', () => {
		render(<Textarea blok={mockBlok} />);
		expect(
			screen.getByPlaceholderText('Type your message'),
		).toBeInTheDocument();
	});

	it('renders with required indicator', () => {
		render(<Textarea blok={mockBlok} />);
		expect(screen.getByLabelText(/Message/)).toBeRequired();
	});

	it('renders as a textarea element', () => {
		render(<Textarea blok={mockBlok} />);
		expect(screen.getByLabelText(/Message/).tagName).toBe('TEXTAREA');
	});
});
