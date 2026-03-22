import { storyblokEditable } from '@storyblok/react/rsc';
import MfLink from '@/components/link/mfLink';
import { iconMap } from '@/lib/iconMap';
import type { LinkBlok } from '@/types/storyblok';

type LinkProps = {
	blok: LinkBlok;
};

const Link = ({ blok }: LinkProps) => {
	const href =
		blok.link?.linktype === 'story'
			? `/${blok.link.cached_url}`
			: blok.link?.url || '/';

	const icon = blok.icon ? iconMap[blok.icon] : undefined;

	return (
		<div {...storyblokEditable(blok)}>
			<MfLink
				href={href}
				target={blok.link?.target}
				variant={blok.variant}
				icon={icon}
			>
				{blok.label}
			</MfLink>
		</div>
	);
};

export default Link;
