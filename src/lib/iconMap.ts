import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
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
	faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import type { IconNames } from '@/types/componentTypes';
import { IconName } from '@/types/componentTypes';

/**
 * Maps Storyblok icon names to FontAwesome icon definitions.
 * To add a new icon: import it above and add a new entry below.
 */
export const iconMap: Record<IconNames, IconDefinition> = {
	[IconName.buildingShield]: faBuildingShield,
	[IconName.shopLock]: faShopLock,
	[IconName.heartPulse]: faHeartPulse,
	[IconName.graduationCap]: faGraduationCap,
	[IconName.magnifyingGlass]: faMagnifyingGlass,
	[IconName.handshake]: faHandshake,
	[IconName.shieldHalved]: faShieldHalved,
	[IconName.arrowTrendUp]: faArrowTrendUp,
	[IconName.shield]: faShield,
	[IconName.clapperboard]: faClapperboard,
	[IconName.arrowRight]: faArrowRight,
};
