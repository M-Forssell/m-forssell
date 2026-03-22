import { apiPlugin, storyblokInit } from '@storyblok/react';
import Page from '@/bloks/page/Page';
import Feature from '@/bloks/feature/Feature';
import Grid from '@/bloks/grid/Grid';
import Teaser from '@/bloks/teaser/Teaser';
import Heading from '@/bloks/heading/Heading';
import TextInput from '@/bloks/text-input/TextInput';
import Dropdown from '@/bloks/dropdown/Dropdown';
import Textarea from '@/bloks/textarea/Textarea';
import Checkbox from '@/bloks/checkbox/Checkbox';
import Form from '@/bloks/form/Form';
import Success from '@/bloks/success/Success';
import Title from '@/bloks/title/Title';
import Text from '@/bloks/text/Text';
import Link from '@/bloks/link/Link';

const accessToken = process.env.STORYBLOK_DELIVERY_API_TOKEN;
const region = process.env.STORYBLOK_REGION || 'eu';
const apiBaseUrl = process.env.STORYBLOK_API_BASE_URL;

export function getStoryblokVersion(): 'draft' | 'published' {
	return process.env.STORYBLOK_VERSION === 'published' ? 'published' : 'draft';
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
		textInput: TextInput,
		dropdown: Dropdown,
		textarea: Textarea,
		checkbox: Checkbox,
		form: Form,
		success: Success,
		Title: Title,
		text: Text,
		link: Link,
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
