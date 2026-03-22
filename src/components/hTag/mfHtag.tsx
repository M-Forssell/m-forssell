import { JSX } from 'react';
import classNames from 'classnames/bind';
import { Icon } from '@/components/icon/icon';
import {
	HeadingLevels,
	HeadingLevel,
	HSizes,
	HSize,
	IconNames,
} from '@/types/componentTypes';
import styles from './mfHtag.module.scss';

export type HTagProps = {
	tag?: HeadingLevels;
	size?: HSizes;
	variant?: 'underlined';
	children: React.ReactNode;
	suffix?: string;
	iconName?: IconNames;
};

const baseClass = 'h-tag';

export default function H({
	children,
	tag = HeadingLevel.h2,
	size = HSize.md,
	variant,
	suffix,
	iconName,
}: HTagProps) {
	const cx = classNames.bind(styles);
	const hTagClass = cx({
		[`${baseClass}`]: true,
		[`${baseClass}--${size}`]: true,
		[`${baseClass}--${variant}`]: !!variant,
		[`${baseClass}--has-icon`]: !!iconName,
	});

	const suffixClass = cx(`${baseClass}--suffix`);
	const contentClass = cx(`${baseClass}__content`);
	const iconClass = cx(`${baseClass}__icon`);

	const Tag = `${tag}` as keyof JSX.IntrinsicElements;
	const safeSuffix = typeof suffix === 'string' ? suffix : undefined;
	const safeChildren =
		typeof children === 'string' || typeof children === 'number' || !children
			? children
			: String(children);

	return (
		<Tag className={hTagClass}>
			<span className={contentClass}>{safeChildren}</span>
			{safeSuffix && <span className={suffixClass}>{safeSuffix}</span>}
			{iconName && <Icon className={iconClass} iconName={iconName} />}
		</Tag>
	);
}
