import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';
import type { TeaserBlok } from '@/types/storyblok';
import RichText from '@/components/rich-text/rich-text';
import Card from '@/components/card/mfCard';
import HTag from '@/components/hTag/mfHtag';
import MfLink from '@/components/link/mfLink';

type TeaserProps = {
	blok: TeaserBlok;
};

const Teaser = ({ blok }: TeaserProps) => {
	const media = blok.media?.filename
		? blok.media
		: blok.assets?.filename
			? blok.assets
			: null;

	return (
		<Card
			variant={blok.variant || 'outlined'}
			{...storyblokEditable(blok)}
			className="teaser-card"
			variantExtras={blok.variantExtras}
		>
			{media && (
				<Image
					src={media.filename}
					alt={media.alt || ''}
					width={640}
					height={360}
				/>
			)}
			<HTag
				size={blok.headlineSize}
				suffix={blok.headlineSuffix}
				iconName={blok.iconName}
				tag={blok.headingLevel || 'h2'}
			>
				{blok.headline}
			</HTag>
			{blok.content && Array.isArray(blok.content.content) && (
				<RichText content={blok.content.content} />
			)}
			{blok.link?.url && (
				<MfLink
					href={blok.link.cached_url || blok.link.url}
					target={blok.link.target}
				>
					{blok.link.title || 'Read more'}
				</MfLink>
			)}
		</Card>
	);
};

export default Teaser;
