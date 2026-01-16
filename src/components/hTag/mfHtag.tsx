import { JSX } from 'react';
import styles from './mfHtag.module.scss';
import classNames from 'classnames/bind';
import {
	HeadingLevels,
	HeadingLevel,
	HSizes,
	HSize,
} from '@/types/componentTypes';

export type HProps = {
	tag?: HeadingLevels;
	size?: HSizes;
	variant?: 'underlined';
	children: any;
	suffix?: string;
};

const baseClass = 'h-tag';

export default function H({
	children,
	tag = HeadingLevel.h2,
	size = HSize.md,
	variant,
	suffix,
}: HProps) {
	const cx = classNames.bind(styles);
	const hTagClass = cx({
		[`${baseClass}`]: true,
		[`${baseClass}--${size}`]: true,
		[`${baseClass}--${variant}`]: !!variant,
	});
	const suffixClass = cx(`${baseClass}--suffix`);
	const Tag = `${tag}` as keyof JSX.IntrinsicElements;
	return (
		<Tag className={hTagClass}>
			<span>{children}</span>
			{suffix && <span className={suffixClass}>{suffix}</span>}
		</Tag>
	);
}
