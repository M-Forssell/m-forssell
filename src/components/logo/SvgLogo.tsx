import type { SVGProps } from 'react';
import LogoSvg from '@/assets/logo-light.svg';

export default function SvgLogo(props: SVGProps<SVGSVGElement>) {
	return <LogoSvg aria-label="Logo" {...props} />;
}
