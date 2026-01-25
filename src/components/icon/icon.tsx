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
import { IconNames, IconName } from '../../types/componentTypes';
import './icon.modules.scss';

export type IconProps = {
	iconName: IconNames;
	className?: string;
};
export function Icon({ iconName, className }: IconProps) {
	//TODO: Move icon selector to lib
	const icon = () => {
		switch (iconName) {
			case IconName.buildingShield:
				return faBuildingShield;
			case IconName.shopLock:
				return faShopLock;
			case IconName.heartPulse:
				return faHeartPulse;
			case IconName.graduationCap:
				return faGraduationCap;
			case IconName.magnifyingGlass:
				return faMagnifyingGlass;
			case IconName.handshake:
				return faHandshake;
			case IconName.shieldHalved:
				return faShieldHalved;
			case IconName.arrowTrendUp:
				return faArrowTrendUp;
			case IconName.shield:
				return faShield;
			case IconName.clapperboard:
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
