import { JSX } from 'react';
import styles from './mfHtag.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '@/components/icon/icon';
import {
	HeadingLevels,
	HeadingLevel,
	HSizes,
	HSize,
	IconNames,
} from '@/types/componentTypes';

export type HProps = {
	tag?: HeadingLevels;
	size?: HSizes;
	variant?: 'underlined';
	children: any;
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
}: HProps) {
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
	return (
		<Tag className={hTagClass}>
			<span className={contentClass}>{children}</span>
			{suffix && <span className={suffixClass}>{suffix}</span>}
			{iconName && <Icon className={iconClass} iconName={iconName} />}
		</Tag>
	);
}
