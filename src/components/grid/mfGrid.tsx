import styles from './mfGrid.module.scss';
import classNames from 'classnames/bind';
type GridProps = {
	numberOfColumns?: 1 | 2 | 3 | 4;
	nested?: boolean;
	children?: React.ReactNode;
};

export default function Grid({
	children,
	numberOfColumns = 2,
	nested = false,
}: GridProps) {
	const cx = classNames.bind(styles);

	const gridClasses = cx({
		[`${styles.mfGrid}`]: !nested,
		[`${styles[`mfGrid--cols-${numberOfColumns}`]}`]: true && !nested,
		[`${styles[`mfGrid--nested--cols-${numberOfColumns}`]}`]: nested,
		[`${styles['mfGrid--nested']}`]: nested,
	});

	if (nested) {
		return <section className={styles.container}><div className={gridClasses}>{children}</div></section>;
	} else {
		return <section className={gridClasses}>{children}</section>;
	}

}
