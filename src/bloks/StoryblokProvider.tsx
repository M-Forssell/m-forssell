'use client';

import { ReactNode, useEffect } from 'react';
import { getStoryblokApi } from '../lib/storyblok';

type StoryblokProviderProps = {
	children: ReactNode;
};

export default function StoryblokProvider({
	children,
}: StoryblokProviderProps) {
	useEffect(() => {
		// Initialize Storyblok after first render to avoid blocking LCP
		getStoryblokApi();
	}, []);

	return <>{children}</>;
}
