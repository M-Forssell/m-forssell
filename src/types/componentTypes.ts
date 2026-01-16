export const CardVariant = {
	filled: 'filled',
	elevated: 'elevated',
	outlined: 'outlined',
	default: 'default',
} as const;

export type CardVariants = (typeof CardVariant)[keyof typeof CardVariant];

export const HeadingLevel = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
} as const;

export type HeadingLevels = (typeof HeadingLevel)[keyof typeof HeadingLevel];

export const HSize = {
	sm: 'sm',
	md: 'md',
	lg: 'lg',
} as const;

export type HSizes = (typeof HSize)[keyof typeof HSize];

export const PSize = {
	sm: 'sm',
	md: 'md',
	lg: 'lg',
} as const;

export type PSizes = (typeof PSize)[keyof typeof PSize];

export const RichTextNodeType = {
	paragraph: 'paragraph',
	heading: 'heading',
	blockquote: 'blockquote',
	bullet_list: 'bullet_list',
	ordered_list: 'ordered_list',
	list_item: 'list_item',
	code_block: 'code_block',
	horizontal_rule: 'horizontal_rule',
	hard_break: 'hard_break',
} as const;

export type RichTextNodeTypes =
	(typeof RichTextNodeType)[keyof typeof RichTextNodeType];

export const MarkType = {
	bold: 'bold',
	italic: 'italic',
	underline: 'underline',
	strike: 'strike',
	code: 'code',
	link: 'link',
	styled: 'styled',
	textStyle: 'textStyle',
} as const;

export type MarkTypes = (typeof MarkType)[keyof typeof MarkType];
