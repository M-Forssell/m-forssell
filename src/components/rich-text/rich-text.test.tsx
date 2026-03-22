import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RichText from './rich-text';
import type { RichTextNode } from './rich-text-types';

describe('RichText', () => {
	it('renders paragraph with text', () => {
		const content: RichTextNode[] = [
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Hello world',
					},
				],
			},
		];
		render(<RichText content={content} />);
		expect(screen.getByText('Hello world')).toBeInTheDocument();
	});

	it('renders heading with level', () => {
		const content: RichTextNode[] = [
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [
					{
						type: 'text',
						text: 'Test Heading',
					},
				],
			},
		];
		const { container } = render(<RichText content={content} />);
		const heading = container.querySelector('h2');
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent('Test Heading');
	});

	it('renders bold text', () => {
		const content: RichTextNode[] = [
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Bold text',
						marks: [{ type: 'bold' }],
					},
				],
			},
		];
		const { container } = render(<RichText content={content} />);
		const strong = container.querySelector('strong');
		expect(strong).toBeInTheDocument();
		expect(strong).toHaveTextContent('Bold text');
	});

	it('renders italic text', () => {
		const content: RichTextNode[] = [
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Italic text',
						marks: [{ type: 'italic' }],
					},
				],
			},
		];
		const { container } = render(<RichText content={content} />);
		const em = container.querySelector('em');
		expect(em).toBeInTheDocument();
		expect(em).toHaveTextContent('Italic text');
	});

	it('does not render color styled mark', () => {
		const content: RichTextNode[] = [
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Colored text',
						marks: [
							{
								type: 'textStyle',
								attrs: { color: '#ff0000' },
							},
						],
					},
				],
			},
		];
		const { container } = render(<RichText content={content} />);
		const paragraph = container.querySelector('p');
		expect(paragraph).toBeInTheDocument();
		expect(paragraph).toHaveTextContent('Colored text');
		expect(paragraph).not.toHaveStyle('color: #ff0000');
	});

	it('renders link with href', () => {
		const content: RichTextNode[] = [
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Click here',
						marks: [
							{
								type: 'link',
								attrs: {
									href: 'https://example.com',
									target: '_blank',
								},
							},
						],
					},
				],
			},
		];
		const { container } = render(<RichText content={content} />);
		const link = container.querySelector('a');
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', 'https://example.com');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('renders bullet list', () => {
		const content: RichTextNode[] = [
			{
				type: 'bullet_list',
				content: [
					{
						type: 'list_item',
						content: [
							{
								type: 'paragraph',
								content: [
									{
										type: 'text',
										text: 'Item 1',
									},
								],
							},
						],
					},
				],
			},
		];
		const { container } = render(<RichText content={content} />);
		const ul = container.querySelector('ul');
		expect(ul).toBeInTheDocument();
		expect(screen.getByText('Item 1')).toBeInTheDocument();
	});

	it('renders ordered list', () => {
		const content: RichTextNode[] = [
			{
				type: 'ordered_list',
				content: [
					{
						type: 'list_item',
						content: [
							{
								type: 'paragraph',
								content: [
									{
										type: 'text',
										text: 'First',
									},
								],
							},
						],
					},
				],
			},
		];
		const { container } = render(<RichText content={content} />);
		const ol = container.querySelector('ol');
		expect(ol).toBeInTheDocument();
		expect(screen.getByText('First')).toBeInTheDocument();
	});

	it('renders blockquote', () => {
		const content: RichTextNode[] = [
			{
				type: 'blockquote',
				content: [
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'Quote text',
							},
						],
					},
				],
			},
		];
		const { container } = render(<RichText content={content} />);
		const blockquote = container.querySelector('blockquote');
		expect(blockquote).toBeInTheDocument();
		expect(screen.getByText('Quote text')).toBeInTheDocument();
	});

	it('renders code block', () => {
		const content: RichTextNode[] = [
			{
				type: 'code_block',
				content: [
					{
						type: 'text',
						text: 'const x = 1;',
					},
				],
			},
		];
		const { container } = render(<RichText content={content} />);
		const pre = container.querySelector('pre');
		const code = container.querySelector('code');
		expect(pre).toBeInTheDocument();
		expect(code).toBeInTheDocument();
		expect(screen.getByText('const x = 1;')).toBeInTheDocument();
	});

	it('renders horizontal rule', () => {
		const content: RichTextNode[] = [
			{
				type: 'horizontal_rule',
			} as RichTextNode,
		];
		const { container } = render(<RichText content={content} />);
		const hr = container.querySelector('hr');
		expect(hr).toBeInTheDocument();
	});

	it('renders empty content as null', () => {
		const { container } = render(<RichText content={[]} />);
		expect(container.firstChild).toBeNull();
	});

	describe('size variants', () => {
		const paragraphContent: RichTextNode[] = [
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'Test' }],
			},
		];

		it('applies md size class by default', () => {
			const { container } = render(<RichText content={paragraphContent} />);
			const wrapper = container.firstChild as HTMLElement;
			expect(wrapper.className).toContain('richText--md');
		});

		it('applies xs size class', () => {
			const { container } = render(
				<RichText content={paragraphContent} size="xs" />,
			);
			const wrapper = container.firstChild as HTMLElement;
			expect(wrapper.className).toContain('richText--xs');
		});

		it('applies sm size class', () => {
			const { container } = render(
				<RichText content={paragraphContent} size="sm" />,
			);
			const wrapper = container.firstChild as HTMLElement;
			expect(wrapper.className).toContain('richText--sm');
		});

		it('applies lg size class', () => {
			const { container } = render(
				<RichText content={paragraphContent} size="lg" />,
			);
			const wrapper = container.firstChild as HTMLElement;
			expect(wrapper.className).toContain('richText--lg');
		});
	});
});
