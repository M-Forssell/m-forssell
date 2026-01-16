import { MarkTypes, RichTextNodeTypes } from '@/types/componentTypes';

export type Mark = {
	type: MarkTypes;
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
	type: RichTextNodeTypes;
	content?: Array<TextNode | ImageNode | RichTextNode>;
	attrs?: {
		level?: number;
		class?: string;
	};
};
