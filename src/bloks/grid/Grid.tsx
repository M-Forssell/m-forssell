import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import type { GridBlok } from '@/types/storyblok';
import MfGrid from '@/components/grid/mfGrid';

type GridProps = {
	blok: GridBlok;
};

const Grid = ({ blok }: GridProps) => (
	console.log('Grid blok:', blok),
	(
		<MfGrid {...storyblokEditable(blok)}>
			{blok.columns.map((nestedBlok) => (
				<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
			))}
		</MfGrid>
	)
);

export default Grid;
