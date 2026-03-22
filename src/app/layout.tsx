import './globals.scss';
import MfHeader from '@/components/header/mfHeader';
import MfFooter from '@/components/footer/mfFooter';
import StoryblokProvider from '../bloks/StoryblokProvider';
import { inter } from './fonts';

export const metadata = {
	title: 'M Forssell Säkerhetskonsult',
	description: 'Oberoende säkerhetsexpertis med rötterna i verkligheten',
};

export default async function RootLayout({
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
				{/* Hidden form for Netlify Forms detection at build time */}
				<form
					name="contact"
					data-netlify="true"
					netlify-honeypot="bot-field"
					hidden
				>
					<input name="form-name" type="hidden" value="contact" />
					<input name="bot-field" />
				</form>
				<StoryblokProvider>
					<MfHeader />
					{children}

					<MfFooter />
				</StoryblokProvider>
			</body>
		</html>
	);
}
