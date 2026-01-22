import SvgLogo from '@/components/logo/SvgLogo';
import Link from 'next/link';
import ThemeToggle from '@/components/theme-toggle/theme-toggle';
import type { RichTextContent } from '@/types/storyblok';
import type { RichTextNode } from '@/components/rich-text/rich-text-types';
import styles from './mfHeader.module.scss';

type MfHeaderProps = {
	headerTitle?: RichTextContent;
	homeLink?: any;
};

const extractTextFromNode = (node: RichTextNode): string => {
	if ((node as any).type === 'text') {
		return (node as any).text || '';
	}
	if (node.type === 'paragraph' && (node as any).content) {
		return (node as any).content.map(extractTextFromNode).join('');
	}
	return '';
};

const MfHeader = ({ headerTitle, homeLink }: MfHeaderProps) => {
	//Stringify headerTitle function
	const stringifyHeaderTitle = (content?: RichTextContent) => {
		if (!content || !content.content) return '';
		return content.content.map((node) => extractTextFromNode(node)).join(' ');
	};

	return (
		<header className={styles.mfHeader}>
			<Link
				href={homeLink?.url || '/'}
				aria-label={stringifyHeaderTitle(headerTitle) || 'M Forssell — Home'}
				className={styles['mfHeader--logo']}
			>
				<SvgLogo aria-hidden="true" width="100" focusable="false" />
				<span aria-hidden="true" className={styles['mfHeader--title']}>
					{headerTitle?.content?.map((node, index) => (
						<span key={index} className={styles['mfHeader--title-line']}>
							{extractTextFromNode(node)}
						</span>
					))}
				</span>
			</Link>
			<ThemeToggle />
		</header>
	);
};

export default MfHeader;
