import classNames from 'classnames/bind';
import { CardVariants, CardVariant } from '@/types/componentTypes';
import { CardVariantsExtra } from '@/types/storyblok';
import styles from './mfCard.module.scss';

type CardProps = {
	children: React.ReactNode;
	variant?: CardVariants;
	className?: string;
	variantExtras?: Array<CardVariantsExtra>;
};
const baseClass = 'mf-card';
export default function Card({
	children,
	variant = CardVariant.default,
	className,
	variantExtras,
}: CardProps) {
	const cx = classNames.bind(styles);

	const cardClass = cx({
		[`${className}`]: !!className,
		[`${baseClass}`]: true,
		[`${baseClass}--${variant}`]: true,
		...variantExtras?.reduce(
			(acc, extra) => ({
				...acc,
				[`${baseClass}--${extra}`]: true,
			}),
			{},
		),
	});

	return <article className={cardClass}>{children}</article>;
}
