import styles from './mfCard.module.scss';
import classNames from 'classnames/bind';
import { CardVariants, CardVariant } from '@/types/componentTypes';
type CardProps = {
	children: React.ReactNode;
	variant?: CardVariants;
};
const baseClass = 'mf-card';
export default function Card({
	children,
	variant = CardVariant.default,
}: CardProps) {
	const cx = classNames.bind(styles);

	const cardClass = cx({
		[`${baseClass}`]: true,
		[`${baseClass}--${variant}`]: true,
	});

	return <article className={cardClass}>{children}</article>;
}
