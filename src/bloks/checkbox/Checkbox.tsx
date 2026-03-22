import { storyblokEditable } from '@storyblok/react/rsc';
import type { CheckboxBlok } from '@/types/storyblok';
import MfCheckbox from '@/components/checkbox/mfCheckbox';

type CheckboxProps = {
	blok: CheckboxBlok;
};

const Checkbox = ({ blok }: CheckboxProps) => {
	return (
		<div {...storyblokEditable(blok)}>
			<MfCheckbox
				label={blok.label}
				name={blok.name}
				required={blok.required}
			/>
		</div>
	);
};

export default Checkbox;
