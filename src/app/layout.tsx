import './globals.scss';
import StoryblokProvider from '../bloks/StoryblokProvider';
import MfHeader from '@/components/header/mfHeader';
import { inter } from './fonts';
import Icon from '@/components/icon/icon';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

//import { faShopLock } from '@fortawesome/free-solid-svg-icons';

export const metadata = {
	title: 'M Forssell Säkerhetskonsult',
	description: 'Oberoende säkerhetsexpertis med rötterna i verkligheten',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="sv" className={inter.variable} suppressHydrationWarning>
			<head>
				{/* Favicon */}
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				{/* Critical resource hints */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				{/* Inline critical theme script */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
							try {
								const theme = localStorage.getItem('theme');
								if (theme && theme !== 'system') {
									document.documentElement.setAttribute('data-theme', theme);
								}
							} catch (e) {}
						`,
					}}
				/>
			</head>
			<body>
				<StoryblokProvider>
					<MfHeader />
					{children}
					<footer>All rights reserved © 2026 </footer>
				</StoryblokProvider>
			</body>
		</html>
	);
}
