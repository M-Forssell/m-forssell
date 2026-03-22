import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import type { FormBlok } from '@/types/storyblok';
import MfForm from '@/components/form/mfForm';

type FormProps = {
	blok: FormBlok;
};

const Form = ({ blok }: FormProps) => {
	return (
		<div {...storyblokEditable(blok)}>
			<MfForm
				formName={blok.formName || 'contact'}
				action={blok.action}
				submitLabel={blok.submitLabel}
				successMessage={blok.successMessage}
				errorMessage={blok.errorMessage}
			>
				{blok.fields?.map((fieldBlok) => (
					<StoryblokServerComponent blok={fieldBlok} key={fieldBlok._uid} />
				))}
			</MfForm>
		</div>
	);
};

export default Form;
