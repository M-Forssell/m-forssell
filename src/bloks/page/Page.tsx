import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import type { PageBlok } from '@/types/storyblok';
import styles from './Page.module.scss';

type PageProps = {
	blok: PageBlok;
};

// Server component; no async needed because there is no data fetching here.
const Page = ({ blok }: PageProps) => {
	return (
		<main {...storyblokEditable(blok)} className={styles.page}>
			{Array.isArray(blok.body) &&
				blok.body.map((nestedBlok) => (
					<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
				))}
		</main>
	);
};

export default Page;
