import { storyblokEditable } from '@storyblok/react/rsc';
import RichText from '@/components/rich-text/rich-text';
import type { BaseBlok, RichTextContent } from '@/types/storyblok';

export interface TextBlok extends BaseBlok {
	component: 'text';
	content?: RichTextContent;
	variant?: string;
}

type TextProps = {
	blok: TextBlok;
};

const Text = ({ blok }: TextProps) => {
	return (
		<div {...storyblokEditable(blok)}>
			{blok.content && Array.isArray(blok.content.content) && (
				<RichText content={blok.content.content} />
			)}
		</div>
	);
};

export default Text;
