import Link from 'next/link';
import SvgLogo from '@/components/logo/SvgLogo';
import MfNavigation from '@/components/navigation/mfNavigation';
import type {
	StoryblokApiResponse,
	HeaderContent,
	RichTextContent,
} from '@/types/storyblok';
import type {
	RichTextNode,
	TextNode,
	ImageNode,
} from '@/components/rich-text/rich-text-types';
import { getStoryblokApi, getStoryblokVersion } from '@/lib/storyblok';
import styles from './mfHeader.module.scss';

const storyblokApi = getStoryblokApi();

const extractTextFromNode = (
	node: RichTextNode | TextNode | ImageNode,
): string => {
	if ('text' in node) {
		return node.text || '';
	}
	if (node.type === 'paragraph' && node.content) {
		return node.content.map(extractTextFromNode).join('');
	}
	return '';
};

const MfHeader = async () => {
	// Get storyblok content global

	const global: StoryblokApiResponse<HeaderContent> | null = await storyblokApi
		.get('cdn/stories/site/header', {
			version: getStoryblokVersion(),
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error('Error fetching global content:', error);
			return null;
		});

	//Stringify headerTitle function
	const stringifyHeaderTitle = (content?: RichTextContent) => {
		if (!content || !content.content) return '';
		return content.content.map((node) => extractTextFromNode(node)).join(' ');
	};

	const headerTitle = global?.story?.content.headerTitle;

	return (
		<header className={styles.mfHeader}>
			<div className={styles['mfHeader__content']}>
				<Link
					href={
						global?.story?.content.homeLink?.linktype === 'story'
							? '/'
							: global?.story?.content.homeLink?.cached_url || '/'
					}
					aria-label={
						stringifyHeaderTitle(global?.story?.content.headerTitle) ||
						'M Forssell — Home'
					}
					className={styles['mfHeader--logo']}
				>
					<SvgLogo aria-hidden="true" width="90" focusable="false" />
					{headerTitle && Array.isArray(headerTitle.content) && (
						<span aria-hidden="true" className={styles['mfHeader--title']}>
							{headerTitle.content.map((node, index) => (
								<span key={index} className={styles['mfHeader--title-line']}>
									{extractTextFromNode(node)}
								</span>
							))}
						</span>
					)}
				</Link>
				<MfNavigation links={global?.story?.content.navigation || []} />
			</div>
		</header>
	);
};

export default MfHeader;
