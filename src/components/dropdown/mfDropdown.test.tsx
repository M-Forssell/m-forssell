import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MfDropdown from './mfDropdown';

const options = [
	{ label: 'Option A', value: 'a' },
	{ label: 'Option B', value: 'b' },
	{ label: 'Option C', value: 'c' },
];

describe('MfDropdown', () => {
	it('renders with label', () => {
		render(<MfDropdown label="Country" name="country" options={options} />);
		expect(screen.getByLabelText('Country')).toBeInTheDocument();
	});

	it('renders all options', () => {
		render(<MfDropdown label="Country" name="country" options={options} />);
		expect(screen.getAllByRole('option')).toHaveLength(3);
	});

	it('renders placeholder option', () => {
		render(
			<MfDropdown
				label="Country"
				name="country"
				options={options}
				placeholder="Select a country"
			/>,
		);
		expect(screen.getByText('Select a country')).toBeInTheDocument();
	});

	it('renders required indicator', () => {
		render(
			<MfDropdown label="Country" name="country" options={options} required />,
		);
		expect(screen.getByLabelText(/Country/)).toBeRequired();
	});

	it('renders error message', () => {
		render(
			<MfDropdown
				label="Country"
				name="country"
				options={options}
				error="Please select a country"
			/>,
		);
		expect(screen.getByRole('alert')).toHaveTextContent(
			'Please select a country',
		);
	});
});
