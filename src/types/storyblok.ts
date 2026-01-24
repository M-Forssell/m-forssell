import type {
	CardVariants,
	HeadingLevels,
	HSizes,
	IconNames,
} from './componentTypes';
// Storyblok asset type
export interface StoryblokAsset {
	id: number | null;
	alt: string | null;
	name: string;
	focus: string | null;
	title: string | null;
	source: string | null;
	filename: string;
	copyright: string | null;
	fieldtype: 'asset';
	meta_data: Record<string, unknown>;
}

// Storyblok link type
export interface StoryblokLink {
	id?: string;
	url: string;
	linktype: 'story' | 'url' | 'email' | 'asset';
	fieldtype: 'multilink';
	cached_url: string;
	title?: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
}

// Rich text content type (Storyblok document structure)
import type { RichTextNode } from '@/components/rich-text/rich-text-types';

export interface RichTextContent {
	type: 'doc';
	content: RichTextNode[];
}

// Base Storyblok blok with common fields
export interface BaseBlok {
	_uid: string;
	component: string;
	_editable?: string;
}

// Page blok - root component with body array
export interface PageBlok extends BaseBlok {
	component: 'page';
	body?: Array<FeatureBlok | GridBlok | TeaserBlok>;
}

// Feature blok
export interface FeatureBlok extends BaseBlok {
	component: 'feature';
	name: string;
	variant?: CardVariants;
	content?: RichTextContent;
}

// Grid blok
export interface GridBlok extends BaseBlok {
	component: 'grid';
	columns: Array<FeatureBlok | TeaserBlok>;
	numberOfCols: 1 | 2 | 3 | 4;
}

export type CardVariantsExtra = 'align-center' | 'align-right';

// Teaser blok
export interface TeaserBlok extends BaseBlok {
	iconName: IconNames;
	component: 'teaser';
	headline: string;
	headlineSize?: HSizes;
	headlineSuffix?: string;
	headingLevel?: HeadingLevels;
	variant?: CardVariants;
	content?: RichTextContent;
	media?: StoryblokAsset;
	assets?: StoryblokAsset;
	link?: StoryblokLink;
	variantExtras?: Array<CardVariantsExtra>;
}

// Union type of all bloks
export type AnyBlok = PageBlok | FeatureBlok | GridBlok | TeaserBlok;

// Global/Footer content type
export interface GlobalContent {
	headerTitle?: RichTextContent;
	homeLink?: StoryblokLink;
	email?: StoryblokLink;
	phone?: StoryblokLink;
	address?: string;
	social?: StoryblokLink;
	[key: string]: unknown;
}

// Story metadata
export interface StoryblokStory<Content = AnyBlok> {
	id: number;
	uuid: string;
	name: string;
	slug: string;
	full_slug: string;
	created_at: string;
	published_at: string | null;
	first_published_at: string | null;
	content: Content;
	position: number;
	tag_list: string[];
	is_startpage: boolean;
	parent_id: number | null;
	group_id: string | null;
	alternates: Array<{
		id: number;
		name: string;
		slug: string;
		published: boolean;
		full_slug: string;
		is_folder: boolean;
	}>;
	translated_slugs: Array<{ lang: string; name: string; slug: string }>;
	lang: string;
	default_full_slug: string | null;
}
// Storyblok API response data structure
export interface StoryblokApiResponse<Content = AnyBlok> {
	story: StoryblokStory<Content>;
	relations: Record<string, unknown>;
	links: Record<string, unknown>;
}
