import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
	faShopLock,
	faHeartPulse,
	faGraduationCap,
	faBuildingShield,
	faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import './icon.modules.scss';
const icons = [
	'building-shield',
	'shop-lock',
	'heart-pulse',
	'graduation-cap',
	'magnifying-glass',
] as const;

export type IconProps = {
	iconName: (typeof icons)[number];
	className?: string;
};
export function Icon({ iconName }: IconProps) {
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

			default:
				return null;
		}
	};

	//console.log('Icon rendered with icon:', icon());
	if (icon() === null) return null;
	return (
		<span className="mf-icon">
			<FontAwesomeIcon
				icon={icon() as IconDefinition}
				style={{ maxHeight: '100%', maxWidth: '100%' }}
			/>
		</span>
	);
}

export default Icon;
