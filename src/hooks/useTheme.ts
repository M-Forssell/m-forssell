'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
	const [theme, setTheme] = useState<Theme>('system');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Reduce render delay by deferring non-critical work
		const stored = localStorage.getItem('theme') as Theme | null;
		if (stored) {
			setTheme(stored);
			// Theme is already applied by inline script in layout
		}
		setMounted(true);
	}, []);

	const applyTheme = (newTheme: Theme) => {
		const root = document.documentElement;

		if (newTheme === 'system') {
			root.removeAttribute('data-theme');
		} else {
			root.setAttribute('data-theme', newTheme);
		}
	};

	const changeTheme = (newTheme: Theme) => {
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		applyTheme(newTheme);
	};

	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		changeTheme(newTheme);
	};

	return { theme, changeTheme, toggleTheme, mounted };
}
