import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconNames } from '@/types/componentTypes';
import { iconMap } from '@/lib/iconMap';
import './icon.modules.scss';

export type IconProps = {
	iconName: IconNames;
	className?: string;
};

export function Icon({ iconName, className }: IconProps) {
	const icon = iconMap[iconName];
	if (!icon) return null;

	return (
		<span className={`mf-icon ${className}`}>
			<FontAwesomeIcon
				icon={icon}
				style={{ maxHeight: '100%', maxWidth: '100%' }}
			/>
		</span>
	);
}

export default Icon;
