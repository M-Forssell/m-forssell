import { storyblokEditable } from '@storyblok/react/rsc';
import type { CheckboxBlok } from '@/types/storyblok';
import MfCheckbox from '@/components/checkbox/mfCheckbox';

type CheckboxProps = {
	blok: CheckboxBlok;
};

const Checkbox = ({ blok }: CheckboxProps) => {
	const linkUrl =
		blok.linkUrl?.linktype === 'story'
			? `/${blok.linkUrl.cached_url}`
			: blok.linkUrl?.url;

	return (
		<div {...storyblokEditable(blok)}>
			<MfCheckbox
				label={blok.label}
				name={blok.name}
				required={blok.required}
				linkText={blok.linkText}
				linkUrl={linkUrl}
			/>
		</div>
	);
};

export default Checkbox;
