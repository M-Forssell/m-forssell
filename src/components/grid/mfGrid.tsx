import styles from './mfGrid.module.scss';
type GridProps = {
	children: React.ReactNode;
	numberOfColumns?: number;
};

export default function Grid({ children, numberOfColumns = 2 }: GridProps) {
	const gridClasses = `${styles.mfGrid} ${styles[`mfGrid--cols-${numberOfColumns}`]}`;
	return <section className={gridClasses}>{children}</section>;
}
