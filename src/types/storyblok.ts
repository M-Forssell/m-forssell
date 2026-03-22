import type { RichTextNode } from '@/components/rich-text/rich-text-types';
import type {
	CardVariants,
	HeadingLevels,
	HSizes,
	IconNames,
	PSizes,
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
	body?: Array<FeatureBlok | GridBlok | TeaserBlok | TitleBlok | TextBlok>;
}

// Feature blok
export interface FeatureBlok extends BaseBlok {
	component: 'feature';
	name: string;
	variant?: CardVariants | 'underlined';
	headingLevel?: HeadingLevels;
	content?: RichTextContent;
}

// Grid blok
export interface GridBlok extends BaseBlok {
	component: 'grid';
	columns: Array<FeatureBlok | TeaserBlok | GridBlok>;
	numberOfCols?: 1 | 2 | 3 | 4;
}

export type CardVariantsExtra = 'align-center' | 'align-right';

// Teaser blok
export interface TeaserBlok extends BaseBlok {
	iconName?: IconNames;
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
	links?: Array<LinkBlok>;
	variantExtras?: Array<CardVariantsExtra>;
}

// TextInput blok
export interface TextInputBlok extends BaseBlok {
	component: 'textInput';
	label: string;
	name: string;
	type?: 'text' | 'email' | 'tel' | 'url';
	placeholder?: string;
	required?: boolean;
}

// Dropdown blok
export interface DropdownBlok extends BaseBlok {
	component: 'dropdown';
	label: string;
	name: string;
	options: string;
	placeholder?: string;
	required?: boolean;
}

// Textarea blok
export interface TextareaBlok extends BaseBlok {
	component: 'textarea';
	label: string;
	name: string;
	placeholder?: string;
	required?: boolean;
	rows?: number;
}

// Checkbox blok
export interface CheckboxBlok extends BaseBlok {
	component: 'checkbox';
	label: string;
	name: string;
	required?: boolean;
}

// Form blok
export interface FormBlok extends BaseBlok {
	component: 'form';
	formName?: string;
	action?: string;
	submitLabel?: string;
	successMessage?: string;
	errorMessage?: string;
	fields?: Array<TextInputBlok | DropdownBlok | TextareaBlok | CheckboxBlok>;
}

// Title blok
export interface TitleBlok extends BaseBlok {
	component: 'Title';
	Title: string;
	level?: HeadingLevels;
	size?: HSizes;
	icon?: string;
	Suffix?: string;
	hidden?: boolean;
}

// Text blok
export interface TextBlok extends BaseBlok {
	component: 'text';
	content?: RichTextContent;
	size?: PSizes;
}

// Success blok
export interface SuccessBlok extends BaseBlok {
	component: 'success';
	title: string;
	headingLevel?: HeadingLevels;
	content?: RichTextContent;
	image?: StoryblokAsset;
}

// Link blok
export interface LinkBlok extends BaseBlok {
	component: 'link';
	label: string;
	link: StoryblokLink;
	variant?: 'outline' | 'cta';
	icon?: IconNames;
	iconPosition?: 'left' | 'right';
}

// Union type of all bloks
export type AnyBlok =
	| PageBlok
	| FeatureBlok
	| GridBlok
	| TeaserBlok
	| TitleBlok
	| TextBlok
	| TextInputBlok
	| DropdownBlok
	| TextareaBlok
	| CheckboxBlok
	| FormBlok
	| SuccessBlok
	| LinkBlok;

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
