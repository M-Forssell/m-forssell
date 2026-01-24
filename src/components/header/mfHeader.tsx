import SvgLogo from '@/components/logo/SvgLogo';
import Link from 'next/link';
import type { RichTextContent } from '@/types/storyblok';
import type { RichTextNode } from '@/components/rich-text/rich-text-types';
import styles from './mfHeader.module.scss';
import { getStoryblokApi } from '@/lib/storyblok';
import type { StoryblokApiResponse, GlobalContent } from '@/types/storyblok';

const storyblokApi = getStoryblokApi();

const extractTextFromNode = (node: RichTextNode): string => {
	if ((node as any).type === 'text') {
		return (node as any).text || '';
	}
	if (node.type === 'paragraph' && (node as any).content) {
		return (node as any).content.map(extractTextFromNode).join('');
	}
	return '';
};

const MfHeader = async () => {
	// Get storyblok content global

	const global: StoryblokApiResponse<GlobalContent> | null = await storyblokApi
		.get('cdn/stories/global/header', {
			version: 'draft',
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
					href={global?.story?.content.homeLink?.cached_url || '/'}
					aria-label={
						stringifyHeaderTitle(global?.story?.content.headerTitle) ||
						'M Forssell — Home'
					}
					className={styles['mfHeader--logo']}
				>
					<SvgLogo aria-hidden="true" width="90" focusable="false" />
					<span aria-hidden="true" className={styles['mfHeader--title']}>
						{headerTitle?.content?.map((node, index) => (
							<span key={index} className={styles['mfHeader--title-line']}>
								{extractTextFromNode(node)}
							</span>
						))}
					</span>
				</Link>
			</div>
		</header>
	);
};

export default MfHeader;
