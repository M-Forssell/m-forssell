import { storyblokEditable } from '@storyblok/react/rsc';
import type { BaseBlok } from '@/types/storyblok';
import MfFooter from '@/components/footer/mfFooter';

type FooterBlokProps = {
	blok: BaseBlok;
};

const Footer = ({ blok }: FooterBlokProps) => {
	return (
		<div {...storyblokEditable(blok)}>
			<MfFooter />
		</div>
	);
};

export default Footer;
