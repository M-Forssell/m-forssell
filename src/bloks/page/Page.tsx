import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import type { PageBlok } from '@/types/storyblok';

type PageProps = {
	blok: PageBlok;
};

const Page = async ({ blok }: PageProps) => {
	return (
		<main {...storyblokEditable(blok)}>
			{blok.body?.map((nestedBlok) => (
				<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
			))}
		</main>
	);
};

export default Page;
