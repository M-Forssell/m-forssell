import { getStoryblokApi } from '@/lib/storyblok';
import type { StoryblokApiResponse, GlobalContent } from '@/types/storyblok';
import RichText from '../rich-text/rich-text';
import MfLink from '../link/mfLink';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from './mfFooter.module.scss';
import ThemeToggle from '@/components/theme-toggle/theme-toggle';

const storyblokApi = getStoryblokApi();

const MfFooter = async () => {
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
		});

	return (
		<footer className={styles.mfFooter}>
			<RichText
				className={styles['mfFooter__content']}
				content={global?.story?.content.headerTitle?.content || []}
			/>

			<div className={styles['mfFooter__links']}>
				<MfLink
					href={global?.story?.content.email?.url || '/'}
					icon={faEnvelope}
				>
					{global?.story?.content.email?.title || 'Email'}
				</MfLink>
				<MfLink href={global?.story?.content.phone?.url || '/'} icon={faPhone}>
					{global?.story?.content.phone?.title || 'Phone'}
				</MfLink>
				<MfLink
					href={global?.story?.content.social?.url || '/'}
					target={global?.story?.content.social?.target || '_blank'}
					rel="noopener noreferrer"
					icon={faLinkedin}
				>
					{global?.story?.content.social?.title || 'Social'}
				</MfLink>
			</div>
			{
				//only show theme toggle if not in production
				process.env.NODE_ENV !== 'production' && <ThemeToggle />
			}
		</footer>
	);
};

export default MfFooter;
