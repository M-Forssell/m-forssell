import { JSX } from 'react';
import styles from './mfHtag.module.scss';
import classNames from 'classnames/bind';

export type HProps = {
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	size?: 'sm' | 'md' | 'lg';
	variant?: 'underlined';
	children: any;
};

const baseClass = 'h-tag';

export default function H({
	children,
	tag = 'h2',
	size = 'md',
	variant,
}: HProps) {
	const cx = classNames.bind(styles);
	const hTagClass = cx({
		[`${baseClass}`]: true,
		[`${baseClass}--${size}`]: true,
		[`${baseClass}--${variant}`]: !!variant,
	});
	const Tag = `${tag}` as keyof JSX.IntrinsicElements;
	return (
		<Tag className={hTagClass}>
			<span>{children}</span>
		</Tag>
	);
}
