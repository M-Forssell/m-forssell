import { notFound } from 'next/navigation';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { getStoryblokApi } from '../../lib/storyblok';
import type { StoryblokStory as StoryblokStoryType } from '@/types/storyblok';

type PageParams = {
	params: Promise<{
		slug?: string[];
	}>;
};

export default async function Page({ params }: PageParams) {
	const { slug } = await params;
	const fullSlug = slug ? slug.join('/') : 'home';
	const sbParams = {
		version: (process.env.STORYBLOK_VERSION || 'draft') as
			| 'draft'
			| 'published',
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
