import { storyblokEditable } from '@storyblok/react/rsc';
import type { FeatureBlok } from '@/types/storyblok';
import RichText from '@/components/rich-text/rich-text';
import Card from '@/components/card/mfCard';
import HTag from '@/components/hTag/mfHtag';
type FeatureProps = {
	blok: FeatureBlok;
};

const Feature = ({ blok }: FeatureProps) => {
	return (
		<Card {...storyblokEditable(blok)}>
			<HTag tag="h2" variant="underlined">
				{blok.name}
			</HTag>
			<RichText content={blok.content?.content || []} />
		</Card>
	);
};

export default Feature;
