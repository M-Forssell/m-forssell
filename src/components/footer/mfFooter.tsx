import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { getStoryblokApi, getStoryblokVersion } from '@/lib/storyblok';
import type {
	StoryblokApiResponse,
	GlobalContent,
	RichTextContent,
} from '@/types/storyblok';
import ThemeToggle from '@/components/theme-toggle/theme-toggle';
import H from '@/components/hTag/mfHtag';
import { HeadingLevels, HSizes } from '@/types/componentTypes';
import RichText from '../rich-text/rich-text';
import MfLink from '../link/mfLink';
import styles from './mfFooter.module.scss';

const storyblokApi = getStoryblokApi();

const MfFooter = async () => {
	const global: StoryblokApiResponse<GlobalContent> | null = await storyblokApi
		.get('cdn/stories/global/footer', {
			version: getStoryblokVersion(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error('Error fetching global content:', error);
			return null;
		});

	const footerContent = global?.story?.content as
		| (GlobalContent & { content?: RichTextContent })
		| undefined;

	return (
		<>
			<footer className={styles.mfFooter}>
				<div className={styles.mfFooter__container}>
					<div className={styles['mfFooter__info']}>
						<H
							tag={global?.story?.content.headingLevel as HeadingLevels}
							size={global?.story?.content.headingSize as HSizes}
							suffix={global?.story?.content.titleSuffix as string}
						>
							{(global?.story?.content.title as string) || 'Footer'}
						</H>
						{footerContent?.content &&
							Array.isArray(footerContent.content.content) && (
								<RichText content={footerContent.content.content} />
							)}
					</div>

					<div className={styles['mfFooter__links']}>
						<span>
							<MfLink
								href={global?.story?.content.email?.url || '/'}
								icon={faEnvelope}
								variant="contact"
							>
								{global?.story?.content.email?.title || 'Email'}
							</MfLink>
						</span>
						<span>
							<MfLink
								href={global?.story?.content.phone?.url || '/'}
								icon={faPhone}
								variant="contact"
							>
								{global?.story?.content.phone?.title || 'Phone'}
							</MfLink>
						</span>
						<span className={styles['mfFooter__social-link']}>
							<MfLink
								href={global?.story?.content.social?.url || '/'}
								target={global?.story?.content.social?.target || '_blank'}
								rel="noopener noreferrer"
								icon={faLinkedin}
								variant="contact"
								showValue={false}
							>
								{global?.story?.content.social?.title || 'Social'}
							</MfLink>
						</span>
					</div>
				</div>
			</footer>
			{
				//only show theme toggle if not in production
				process.env.NODE_ENV !== 'production' && (
					<div className={styles['mfFooter__theme-toggle']}>
						<ThemeToggle />
					</div>
				)
			}
		</>
	);
};

export default MfFooter;
