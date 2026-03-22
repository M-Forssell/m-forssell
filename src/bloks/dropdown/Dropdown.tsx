import { storyblokEditable } from '@storyblok/react/rsc';
import type { DropdownBlok } from '@/types/storyblok';
import MfDropdown from '@/components/dropdown/mfDropdown';

type DropdownProps = {
	blok: DropdownBlok;
};

function parseOptions(options: string) {
	return options
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => {
			const [value, label] = line.includes(':')
				? line.split(':').map((s) => s.trim())
				: [line, line];
			return { value, label };
		});
}

const Dropdown = ({ blok }: DropdownProps) => {
	return (
		<div {...storyblokEditable(blok)}>
			<MfDropdown
				label={blok.label}
				name={blok.name}
				options={parseOptions(blok.options || '')}
				placeholder={blok.placeholder}
				required={blok.required}
			/>
		</div>
	);
};

export default Dropdown;
