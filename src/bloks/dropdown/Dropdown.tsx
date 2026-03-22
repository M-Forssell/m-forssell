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
			if (line.includes(':')) {
				const colonIndex = line.indexOf(':');
				const value = line.slice(0, colonIndex).trim();
				const label = line.slice(colonIndex + 1).trim();
				return { value, label };
			}
			return { value: line, label: line };
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
