import styles from './mfGrid.module.scss';
type GridProps = {
	children: React.ReactNode;
};

export default function Grid({ children }: GridProps) {
	return <section className={styles.mfGrid}>{children}</section>;
}
