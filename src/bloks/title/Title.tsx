import { storyblokEditable } from '@storyblok/react/rsc';
import HTag from '@/components/hTag/mfHtag';
import type { BaseBlok } from '@/types/storyblok';
import type { HeadingLevels, HSizes } from '@/types/componentTypes';

export interface TitleBlok extends BaseBlok {
	component: 'Title';
	Title: string;
	level?: HeadingLevels;
	size?: HSizes;
	icon?: string;
	Suffix?: string;
	hidden?: boolean;
}

type TitleProps = {
	blok: TitleBlok;
};

const Title = ({ blok }: TitleProps) => {
	if (blok.hidden) return null;

	return (
		<div {...storyblokEditable(blok)}>
			<HTag
				tag={blok.level || 'h1'}
				size={blok.size || 'lg'}
				suffix={blok.Suffix || undefined}
			>
				{blok.Title}
			</HTag>
		</div>
	);
};

export default Title;
