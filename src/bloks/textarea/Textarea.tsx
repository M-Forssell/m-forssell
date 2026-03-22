import { storyblokEditable } from '@storyblok/react/rsc';
import type { TextareaBlok } from '@/types/storyblok';
import MfTextarea from '@/components/textarea/mfTextarea';

type TextareaProps = {
	blok: TextareaBlok;
};

const Textarea = ({ blok }: TextareaProps) => {
	return (
		<div {...storyblokEditable(blok)}>
			<MfTextarea
				label={blok.label}
				name={blok.name}
				placeholder={blok.placeholder}
				required={blok.required}
				rows={blok.rows}
			/>
		</div>
	);
};

export default Textarea;
