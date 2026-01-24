import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
	faShopLock,
	faHeartPulse,
	faGraduationCap,
	faBuildingShield,
	faMagnifyingGlass,
	faHandshake,
	faShieldHalved,
	faArrowTrendUp,
	faShield,
} from '@fortawesome/free-solid-svg-icons';
import './icon.modules.scss';
const icons = [
	'building-shield',
	'shop-lock',
	'heart-pulse',
	'graduation-cap',
	'magnifying-glass',
	'shield-halved',
	'handshake',
	'arrow-trend-up',
	'shield',
] as const;

export type IconProps = {
	iconName: (typeof icons)[number];
	className?: string;
};
export function Icon({ iconName, className }: IconProps) {
	//TODO: Move icon selector to lib
	const icon = () => {
		switch (iconName) {
			case 'building-shield':
				return faBuildingShield;
			case 'shop-lock':
				return faShopLock;
			case 'heart-pulse':
				return faHeartPulse;
			case 'graduation-cap':
				return faGraduationCap;
			case 'magnifying-glass':
				return faMagnifyingGlass;
			case 'handshake':
				return faHandshake;
			case 'shield-halved':
				return faShieldHalved;
			case 'arrow-trend-up':
				return faArrowTrendUp;
			case 'shield':
				return faShield;
			default:
				return null;
		}
	};

	//console.log('Icon rendered with icon:', icon());
	if (icon() === null) return null;
	return (
		<span className={`mf-icon ${className}`}>
			<FontAwesomeIcon
				icon={icon() as IconDefinition}
				style={{ maxHeight: '100%', maxWidth: '100%' }}
			/>
		</span>
	);
}

export default Icon;
