import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';
import type { TeaserBlok } from '@/types/storyblok';
import RichText from '@/components/rich-text/rich-text';
import Card from '@/components/card/mfCard';
import HTag from '@/components/hTag/mfHtag';
import MfLink from '@/components/link/mfLink';
import { iconMap } from '@/lib/iconMap';

type TeaserProps = {
	blok: TeaserBlok;
};

const Teaser = ({ blok }: TeaserProps) => {
	const media = blok.media?.filename ? blok.media : null;

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
			{blok.links?.map((linkBlok) => {
				const href =
					linkBlok.link?.linktype === 'story'
						? `/${linkBlok.link.cached_url}`
						: linkBlok.link?.url || '/';
				const icon = linkBlok.icon ? iconMap[linkBlok.icon] : undefined;
				return (
					<MfLink
						key={linkBlok._uid}
						href={href}
						target={linkBlok.link?.target}
						variant={linkBlok.variant}
						icon={icon}
						iconPosition={linkBlok.iconPosition}
					>
						{linkBlok.label}
					</MfLink>
				);
			})}
		</Card>
	);
};

export default Teaser;
