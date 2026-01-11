'use client';

import { ReactNode, useEffect, useState } from 'react';
import { getStoryblokApi } from '../lib/storyblok';

type StoryblokProviderProps = {
	children: ReactNode;
};

export default function StoryblokProvider({
	children,
}: StoryblokProviderProps) {
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		// Initialize Storyblok after first render to avoid blocking LCP
		getStoryblokApi();
		setInitialized(true);
	}, []);

	return <>{children}</>;
}
