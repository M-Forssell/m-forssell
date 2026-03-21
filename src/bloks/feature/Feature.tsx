import { storyblokEditable } from '@storyblok/react/rsc';
import type { FeatureBlok } from '@/types/storyblok';
import RichText from '@/components/rich-text/rich-text';
import Card from '@/components/card/mfCard';
import HTag from '@/components/hTag/mfHtag';
import { CardVariant, CardVariants } from '@/types/componentTypes';

type FeatureProps = {
	blok: FeatureBlok;
};

const Feature = ({ blok }: FeatureProps) => {
	const isUnderlined = blok.variant === 'underlined';
	const cardVariant = Object.values(CardVariant).includes(
		blok.variant as CardVariants,
	)
		? (blok.variant as CardVariants)
		: CardVariant.default;

	return (
		<Card {...storyblokEditable(blok)} variant={cardVariant}>
			<HTag
				tag={blok.headingLevel || 'h2'}
				variant={isUnderlined ? 'underlined' : undefined}
			>
				{blok.name}
			</HTag>
			{blok.content && Array.isArray(blok.content.content) && (
				<RichText content={blok.content.content} />
			)}
		</Card>
	);
};

export default Feature;
