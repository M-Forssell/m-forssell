import { getStoryblokApi, getStoryblokVersion } from '@/lib/storyblok';
import type { StoryblokApiResponse, FooterContent } from '@/types/storyblok';
import ThemeToggle from '@/components/theme-toggle/theme-toggle';
import LinkBlokComponent from '@/bloks/link/Link';
import styles from './mfFooter.module.scss';

const storyblokApi = getStoryblokApi();

const MfFooter = async () => {
	const global: StoryblokApiResponse<FooterContent> | null = await storyblokApi
		.get('cdn/stories/site/footer', {
			version: getStoryblokVersion(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error('Error fetching global content:', error);
			return null;
		});

	const footerContent = global?.story?.content;

	return (
		<>
			<footer className={styles.mfFooter}>
				<div className={styles.mfFooter__container}>
					{footerContent?.links && footerContent.links.length > 0 && (
						<div className={styles['mfFooter__links']}>
							{footerContent.links.map((linkBlok) => (
								<LinkBlokComponent key={linkBlok._uid} blok={linkBlok} />
							))}
						</div>
					)}
				</div>
			</footer>
			{process.env.NODE_ENV !== 'production' && (
				<div className={styles['mfFooter__theme-toggle']}>
					<ThemeToggle />
				</div>
			)}
		</>
	);
};

export default MfFooter;
