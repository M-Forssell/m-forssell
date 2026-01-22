import './globals.scss';
import StoryblokProvider from '../bloks/StoryblokProvider';
import MfHeader from '@/components/header/mfHeader';
import { inter } from './fonts';
import { getStoryblokApi } from '@/lib/storyblok';
import type { StoryblokApiResponse, GlobalContent } from '@/types/storyblok';

const storyblokApi = getStoryblokApi();

export const metadata = {
	title: 'M Forssell Säkerhetskonsult',
	description: 'Oberoende säkerhetsexpertis med rötterna i verkligheten',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Get storyblok content global
	/*
	const global: StoryblokApiResponse<GlobalContent> | null = await storyblokApi
		.get('cdn/stories/global/footer', {
			version: 'draft',
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error('Error fetching global content:', error);
			return null;
		});*/

	//console.log('Global content in layout:', global?.story?.content.headerTitle);
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
					<MfHeader
						headerTitle={{
							type: 'doc',
							content: [
								{
									type: 'paragraph',
									content: [
										{
											text: 'M.Forssell',
											type: 'text',
										},
									],
								},
								{
									type: 'paragraph',
									content: [
										{
											text: 'Säkerhetskonsult',
											type: 'text',
										},
									],
								},
							],
						}}
						homeLink={'/'}
					/>
					{children}
					<footer>All rights reserved © 2026 </footer>
				</StoryblokProvider>
			</body>
		</html>
	);
}
