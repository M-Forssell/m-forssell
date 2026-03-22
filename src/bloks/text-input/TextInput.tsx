import { storyblokEditable } from '@storyblok/react/rsc';
import type { TextInputBlok } from '@/types/storyblok';
import MfTextInput from '@/components/text-input/mfTextInput';

type TextInputProps = {
	blok: TextInputBlok;
};

const TextInput = ({ blok }: TextInputProps) => {
	return (
		<div {...storyblokEditable(blok)}>
			<MfTextInput
				label={blok.label}
				name={blok.name}
				type={blok.type || 'text'}
				placeholder={blok.placeholder}
				required={blok.required}
			/>
		</div>
	);
};

export default TextInput;
