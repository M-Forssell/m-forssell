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
	faClapperboard,
} from '@fortawesome/free-solid-svg-icons';
import { IconNames } from '../../types/componentTypes';
import './icon.modules.scss';

export type IconProps = {
	iconName: IconNames;
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
			case 'clapperboard':
				return faClapperboard;
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
