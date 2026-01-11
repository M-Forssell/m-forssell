import styles from './mfCard.module.scss';
import classNames from 'classnames/bind';

type CardProps = {
	children: React.ReactNode;
	variant?: 'filled' | 'elevated' | 'outlined' | 'default';
};
const baseClass = 'mfCard';
export default function Card({ children, variant = 'default' }: CardProps) {
	const cx = classNames.bind(styles);

	const cardClass = cx({
		[`${baseClass}`]: true,
		[`${baseClass}--${variant}`]: true,
	});

	return <article className={cardClass}>{children}</article>;
}
