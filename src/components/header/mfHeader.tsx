import SvgLogo from '@/components/logo/SvgLogo';
import Link from 'next/link';
import ThemeToggle from '@/components/theme-toggle/theme-toggle';
import styles from './mfHeader.module.scss';

const MfHeader = () => {
	return (
		<header className={styles.mfHeader}>
			<Link
				href="/"
				aria-label="M Forssell — Home"
				className={styles['mfHeader--logo']}
			>
				<SvgLogo width="100" aria-hidden="true" focusable="false" />
				<span className={styles['mfHeader--name']}>
					M Forssell Säkerhetskonsult
				</span>
			</Link>
			<ThemeToggle />
		</header>
	);
};

export default MfHeader;
