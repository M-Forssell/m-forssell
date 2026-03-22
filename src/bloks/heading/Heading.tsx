import { storyblokEditable } from '@storyblok/react/rsc';
import HTag from '@/components/hTag/mfHtag';
import type { BaseBlok } from '@/types/storyblok';
import type { HeadingLevels, HSizes } from '@/types/componentTypes';

export interface HeadingBlok extends BaseBlok {
	component: 'heading';
	title: string;
	level: HeadingLevels;
	size?: HSizes;
}

type HeadingProps = {
	blok: HeadingBlok;
};

const Heading = ({ blok }: HeadingProps) => {
	return (
		<div {...storyblokEditable(blok)}>
			<HTag tag={blok.level} size={blok.size || 'lg'}>
				{blok.title}
			</HTag>
		</div>
	);
};

export default Heading;
