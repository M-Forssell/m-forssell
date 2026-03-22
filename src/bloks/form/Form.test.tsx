import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { FormBlok } from '@/types/storyblok';
import Form from './Form';

vi.mock('@storyblok/react/rsc', () => ({
	storyblokEditable: () => ({}),
	StoryblokServerComponent: ({
		blok,
	}: {
		blok: { component: string; label: string };
	}) => <div data-testid={`field-${blok.component}`}>{blok.label}</div>,
}));

describe('Form blok', () => {
	const mockBlok: FormBlok = {
		_uid: 'form-uid',
		component: 'form',
		formName: 'contact',
		submitLabel: 'Send',
		fields: [
			{
				_uid: 'field-1',
				component: 'textInput',
				label: 'Name',
				name: 'name',
				type: 'text',
				required: true,
			},
			{
				_uid: 'field-2',
				component: 'textarea',
				label: 'Message',
				name: 'message',
				placeholder: 'Your message',
			},
			{
				_uid: 'field-3',
				component: 'checkbox',
				label: 'Accept terms',
				name: 'terms',
				required: true,
			},
		],
	};

	it('renders submit button with custom label', () => {
		render(<Form blok={mockBlok} />);
		expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
	});

	it('renders nested field bloks', () => {
		render(<Form blok={mockBlok} />);
		expect(screen.getByTestId('field-textInput')).toBeInTheDocument();
		expect(screen.getByTestId('field-textarea')).toBeInTheDocument();
		expect(screen.getByTestId('field-checkbox')).toBeInTheDocument();
	});

	it('renders without fields', () => {
		const emptyBlok: FormBlok = {
			_uid: 'form-uid',
			component: 'form',
		};
		render(<Form blok={emptyBlok} />);
		expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
	});

	it('renders success message', () => {
		const blokWithSuccess: FormBlok = {
			...mockBlok,
			successMessage: 'Thank you!',
		};
		render(<Form blok={blokWithSuccess} />);
		expect(screen.getByRole('status')).toHaveTextContent('Thank you!');
	});

	it('sets up Netlify form attributes', () => {
		render(<Form blok={mockBlok} />);
		const form = document.querySelector('form');
		expect(form).toHaveAttribute('name', 'contact');
		expect(form).toHaveAttribute('action', '/__forms.html');
	});
});
