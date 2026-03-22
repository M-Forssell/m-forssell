import { storyblokEditable } from '@storyblok/react/rsc';
import RichText from '@/components/rich-text/rich-text';
import type { PSizes } from '@/types/componentTypes';
import type { BaseBlok, RichTextContent } from '@/types/storyblok';

export interface TextBlok extends BaseBlok {
	component: 'text';
	content?: RichTextContent;
	size?: PSizes;
}

type TextProps = {
	blok: TextBlok;
};

const Text = ({ blok }: TextProps) => {
	return (
		<div {...storyblokEditable(blok)}>
			{blok.content && Array.isArray(blok.content.content) && (
				<RichText content={blok.content.content} size={blok.size} />
			)}
		</div>
	);
};

export default Text;
