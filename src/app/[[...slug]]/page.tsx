import { notFound } from 'next/navigation';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { getStoryblokApi, getStoryblokVersion } from '../../lib/storyblok';
import type { StoryblokStory as StoryblokStoryType } from '@/types/storyblok';

type PageParams = {
	params: Promise<{
		slug?: string[];
	}>;
};

// Revalidate every 60 seconds (ISR - Incremental Static Regeneration)
export const revalidate = 60;

// Generate static params for common routes
export async function generateStaticParams() {
	if (getStoryblokVersion() !== 'published') {
		return [];
	}

	try {
		const storyblokApi = getStoryblokApi();
		const { data } = await storyblokApi.get('cdn/stories', {
			version: 'published',
			per_page: 100,
		});

		return data.stories.map((story: { full_slug: string }) => ({
			slug: story.full_slug === 'home' ? undefined : story.full_slug.split('/'),
		}));
	} catch (error) {
		console.error('Failed to generate static params:', error);
		return [];
	}
}

export default async function Page({ params }: PageParams) {
	const { slug } = await params;
	const fullSlug = slug ? slug.join('/') : 'home';
	const version = getStoryblokVersion();
	const sbParams = {
		version,
		cv: version === 'published' ? Date.now() : undefined,
	};

	const storyblokApi = getStoryblokApi();

	try {
		const { data } = await storyblokApi.get(
			`cdn/stories/${fullSlug}`,
			sbParams,
		);
		const story = data?.story as StoryblokStoryType;
		return <StoryblokServerComponent blok={story.content} />;
	} catch (error: unknown) {
		const err = error as { response?: { status?: number } };
		if (err?.response?.status === 404) {
			return notFound();
		}
		throw error;
	}
}
