import Page from '@/bloks/page/Page';
import Feature from '@/bloks/feature/Feature';
import Grid from '@/bloks/grid/Grid';
import Teaser from '@/bloks/teaser/Teaser';
import Heading from '@/bloks/heading/Heading';
import { apiPlugin, storyblokInit } from '@storyblok/react';

const accessToken = process.env.STORYBLOK_DELIVERY_API_TOKEN;
const region = process.env.STORYBLOK_REGION || 'eu';
const apiBaseUrl = process.env.STORYBLOK_API_BASE_URL;

export function getStoryblokVersion(): 'draft' | 'published' {
	return process.env.STORYBLOK_VERSION === 'published'
		? 'published'
		: 'draft';
}

export const getStoryblokApi = storyblokInit({
	accessToken,
	use: [apiPlugin],
	components: {
		page: Page,
		feature: Feature,
		grid: Grid,
		teaser: Teaser,
		heading: Heading,
	},
	apiOptions: {
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region,
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: apiBaseUrl ? `${new URL(apiBaseUrl).origin}/v2` : undefined,
		/** Enable caching for better performance */
		cache: {
			clear: 'auto',
			type: 'memory',
		},
	},
});
