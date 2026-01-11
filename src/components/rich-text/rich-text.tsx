import type { ReactNode } from 'react';
import Image from 'next/image';

// Rich text node types
export type Mark = {
	type:
		| 'bold'
		| 'italic'
		| 'underline'
		| 'strike'
		| 'code'
		| 'link'
		| 'styled'
		| 'textStyle';
	attrs?: {
		href?: string;
		target?: string;
		linktype?: string;
		class?: string;
		color?: string;
	};
};

export type TextNode = {
	type: 'text';
	text: string;
	marks?: Mark[];
};

export type ImageNode = {
	type: 'image';
	attrs: {
		src: string;
		alt?: string;
		title?: string;
	};
};

export type RichTextNode = {
	type:
		| 'paragraph'
		| 'heading'
		| 'blockquote'
		| 'bullet_list'
		| 'ordered_list'
		| 'list_item'
		| 'code_block'
		| 'horizontal_rule'
		| 'hard_break';
	content?: Array<TextNode | ImageNode | RichTextNode>;
	attrs?: {
		level?: number;
		class?: string;
	};
};

type RichTextProps = {
	content: RichTextNode[];
};

// Render text with marks (bold, italic, links, etc.)
function renderText(node: TextNode): ReactNode {
	let text: ReactNode = node.text;

	if (!node.marks || node.marks.length === 0) {
		return text;
	}

	// Apply marks in reverse order so they nest properly
	for (let i = node.marks.length - 1; i >= 0; i--) {
		const mark = node.marks[i];
		switch (mark.type) {
			case 'bold':
				text = <strong>{text}</strong>;
				break;
			case 'italic':
				text = <em>{text}</em>;
				break;
			case 'underline':
				text = <u>{text}</u>;
				break;
			case 'strike':
				text = <s>{text}</s>;
				break;
			case 'code':
				text = <code>{text}</code>;
				break;
			case 'link':
				text = (
					<a
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
			case 'styled':
				text = <span className={mark.attrs?.class}>{text}</span>;
				break;
			case 'textStyle':
				text = <span style={{ color: mark.attrs?.color }}>{text}</span>;
				break;
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
		return <span key={index}>{renderText(node)}</span>;
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
	if (node.type === 'horizontal_rule') {
		return <hr key={index} />;
	}
	if (node.type === 'hard_break') {
		return <br key={index} />;
	}

	// Only RichTextNode has content property
	if (!('content' in node)) {
		return null;
	}

	// Block nodes
	const content = node.content?.map(
		(child: TextNode | ImageNode | RichTextNode, i: number) =>
			renderNode(child, i),
	);

	switch (node.type) {
		case 'paragraph':
			return <p key={index}>{content}</p>;
		case 'heading': {
			const level = node.attrs?.level || 1;
			const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
			return <HeadingTag key={index}>{content}</HeadingTag>;
		}
		case 'blockquote':
			return <blockquote key={index}>{content}</blockquote>;
		case 'bullet_list':
			return <ul key={index}>{content}</ul>;
		case 'ordered_list':
			return <ol key={index}>{content}</ol>;
		case 'list_item':
			return <li key={index}>{content}</li>;
		case 'code_block':
			return (
				<pre key={index} className={node.attrs?.class}>
					<code>{content}</code>
				</pre>
			);
		default:
			return null;
	}
}

export default function RichText({ content }: RichTextProps) {
	if (!content || content.length === 0) {
		return null;
	}

	return (
		<div className="rich-text">
			{content.map((node, index) => renderNode(node, index))}
		</div>
	);
}
