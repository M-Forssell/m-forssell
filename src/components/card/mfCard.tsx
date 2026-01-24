import styles from './mfCard.module.scss';
import classNames from 'classnames/bind';
import { CardVariants, CardVariant } from '@/types/componentTypes';
import { CardVariantsExtra } from '@/types/storyblok';

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
	if (variantExtras) {
		console.log(variantExtras);
		//throw new Error('variantExtras must be an array of strings');
	}

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
