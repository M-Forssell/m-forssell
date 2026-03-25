'use client';

import { useState } from 'react';
import MfLink from '@/components/link/mfLink';
import { iconMap } from '@/lib/iconMap';
import type { LinkBlok } from '@/types/storyblok';
import styles from './mfNavigation.module.scss';

type MfNavigationProps = {
	links: LinkBlok[];
};

const MfNavigation = ({ links }: MfNavigationProps) => {
	const [isOpen, setIsOpen] = useState(false);

	if (links.length === 0) return null;

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	return (
		<nav className={styles.mfNavigation} aria-label="Main navigation">
			<button
				className={styles.mfNavigation__toggle}
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				aria-controls="nav-menu"
				aria-label={isOpen ? 'Close menu' : 'Open menu'}
			>
				<span className={styles.mfNavigation__hamburger} aria-hidden="true" />
			</button>
			<ul
				id="nav-menu"
				className={`${styles.mfNavigation__menu} ${isOpen ? styles['mfNavigation__menu--open'] : ''}`}
				onClick={handleLinkClick}
			>
				{links.map((linkBlok) => {
					const href =
						linkBlok.link?.linktype === 'story'
							? `/${linkBlok.link.cached_url}`
							: linkBlok.link?.url || '/';
					const icon = linkBlok.icon ? iconMap[linkBlok.icon] : undefined;

					return (
						<li key={linkBlok._uid} className={styles.mfNavigation__item}>
							<MfLink
								href={href}
								target={linkBlok.link?.target}
								variant={linkBlok.variant}
								icon={icon}
								iconPosition={linkBlok.iconPosition}
							>
								{linkBlok.label}
							</MfLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default MfNavigation;
