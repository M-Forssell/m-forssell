import { storyblokEditable } from '@storyblok/react/rsc';
import type { TeaserBlok } from '@/types/storyblok';
import RichText from '@/components/rich-text/rich-text';
import Card from '@/components/card/mfCard';
import HTag from '@/components/hTag/mfHtag';

type TeaserProps = {
	blok: TeaserBlok;
};

const Teaser = ({ blok }: TeaserProps) => {
	//console.log('Teaser blok:', blok);
	return (
		<Card
			variant={blok.variant || 'outlined'}
			{...storyblokEditable(blok)}
			className="teaser-card"
			variantExtras={blok.variantExtras}
		>
			<HTag
				size={blok.headlineSize}
				suffix={blok.headlineSuffix}
				iconName={blok.iconName}
				tag={blok.headingLevel || 'h2'}
			>
				{blok.headline}
			</HTag>
			<RichText content={blok.content?.content || []} />
		</Card>
	);
};

export default Teaser;
