'use client';

import { useTheme } from '@/hooks/useTheme';
import styles from './theme-toggle.module.scss';

export default function ThemeToggle() {
	const { theme, toggleTheme, mounted } = useTheme();

	// Avoid hydration mismatch
	if (!mounted) {
		return (
			<button className={styles.toggle} aria-label="Toggle theme" disabled />
		);
	}

	return (
		<button
			onClick={toggleTheme}
			className={styles.toggle}
			aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
		>
			{theme === 'dark' ? '☀️' : '🌙'}
		</button>
	);
}
