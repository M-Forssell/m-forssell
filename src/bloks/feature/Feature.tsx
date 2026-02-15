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
	//console.log('Feature blok:', blok);
	const HVariant =
		(blok.variant as string) === 'underlined' ? 'underlined' : undefined;
	const returnCardVariant = () => {
		// return variant if it matches card variants
		if (Object.values(CardVariant).includes(blok.variant as CardVariants)) {
			return blok.variant as CardVariants;
		}
		return CardVariant.default;
	};

	return (
		<Card {...storyblokEditable(blok)} variant={returnCardVariant()}>
			<HTag tag="h2" variant={HVariant}>
				{blok.name}
			</HTag>
			{blok.content && Array.isArray(blok.content.content) && (
				<RichText content={blok.content.content} />
			)}
		</Card>
	);
};

export default Feature;
