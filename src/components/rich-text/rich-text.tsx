import type { ReactNode } from 'react';
import Image from 'next/image';
import styles from './rich-text.module.scss';
import {
	PSizes,
	PSize,
	HSizes,
	HSize,
	HeadingLevels,
	MarkTypes,
	MarkType,
	RichTextNodeTypes,
	RichTextNodeType,
} from '@/types/componentTypes';
import { RichTextNode, TextNode, ImageNode } from './rich-text-types';
import classNames from 'classnames/bind';
import H from '@/components/hTag/mfHtag';

export type RichTextProps = {
	content: RichTextNode[];
	size?: PSizes;
	className?: string;
};

function renderText(node: TextNode, index: number): ReactNode {
	let text: ReactNode = node.text;

	if (!node.marks || node.marks.length === 0) {
		return text;
	}

	// Apply marks in reverse order so they nest properly
	for (let i = node.marks.length - 1; i >= 0; i--) {
		const mark = node.marks[i];
		switch (mark.type) {
			case MarkType.bold:
				text = <strong key={index}>{text}</strong>;
				break;
			case MarkType.italic:
				text = <em key={index}>{text}</em>;
				break;
			case MarkType.underline:
				text = <u key={index}>{text}</u>;
				break;
			case MarkType.strike:
				text = <s key={index}>{text}</s>;
				break;
			case MarkType.code:
				text = <code key={index}>{text}</code>;
				break;
			case MarkType.link:
				text = (
					<a
						key={index}
						href={mark.attrs?.href}
						target={mark.attrs?.target}
						rel={
							mark.attrs?.target === '_blank'
								? 'noopener noreferrer'
								: undefined
						}
					>
						{text}
					</a>
				);
				break;
			case MarkType.styled:
				text = (
					<span key={index} className={mark.attrs?.class}>
						{text}
					</span>
				);
				break;
			/*
			case MarkType.textStyle:
				text = (
					<span key={index} style={{ color: mark.attrs?.color }}>
						{text}
					</span>
				);
				break;*/
		}
	}

	return text;
}

// Render a single node
function renderNode(
	node: RichTextNode | TextNode | ImageNode,
	index: number,
): ReactNode {
	// Text node
	if ('text' in node) {
		return renderText(node, index);
	}

	// Image node
	if (node.type === 'image' && 'attrs' in node && node.attrs.src) {
		return (
			<Image
				key={index}
				src={node.attrs.src}
				alt={node.attrs.alt || ''}
				title={node.attrs.title}
				width={800}
				height={600}
				className="rich-text-image"
			/>
		);
	}

	// Self-closing nodes (no content)
	if (node.type === RichTextNodeType.horizontal_rule) {
		return <hr key={index} />;
	}
	if (node.type === RichTextNodeType.hard_break) {
		return <br key={index} />;
	}

	// Only RichTextNode has content property
	if (!('content' in node)) {
		return null;
	}

	// Block nodes
	const content = Array.isArray(node.content)
		? node.content.map(
				(child: TextNode | ImageNode | RichTextNode, i: number) =>
					renderNode(child, i),
			)
		: null;

	switch (node.type) {
		case RichTextNodeType.paragraph:
			return <p key={index}>{content}</p>;
		case RichTextNodeType.heading: {
			const level = node.attrs?.level || 1;
			const HeadingTag = `h${level}` as HeadingLevels;
			return (
				<H tag={HeadingTag} key={index}>
					{content}
				</H>
			);
		}
		case RichTextNodeType.blockquote:
			return <blockquote key={index}>{content}</blockquote>;
		case RichTextNodeType.bullet_list:
			return <ul key={index}>{content}</ul>;
		case RichTextNodeType.ordered_list:
			return <ol key={index}>{content}</ol>;
		case RichTextNodeType.list_item:
			return <li key={index}>{content}</li>;
		case RichTextNodeType.code_block:
			return (
				<pre key={index} className={node.attrs?.class}>
					<code>{content}</code>
				</pre>
			);
		default:
			// Return null for unknown node types to prevent rendering objects
			console.warn('Unknown RichText node type:', (node as any).type);
			return null;
	}
}

export default function RichText({ content, size = PSize.md }: RichTextProps) {
	const cx = classNames.bind(styles);
	const richTextClass = cx({
		[`${styles.richText}`]: true,
		[`${styles[`richText--${size}`]}`]: !!size,
	});

	if (!Array.isArray(content) || content.length === 0) {
		return null;
	}

	return (
		<div className={richTextClass}>
			{content.map((node, index) => renderNode(node, index))}
		</div>
	);
}
