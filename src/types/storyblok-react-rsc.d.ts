declare module '@storyblok/react/rsc' {
	export function storyblokEditable(blok: unknown): Record<string, unknown>;
	export function StoryblokServerComponent(
		props: { blok: unknown } & Record<string, unknown>,
	): JSX.Element;
}
