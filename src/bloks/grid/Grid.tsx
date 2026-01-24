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
	<MfGrid {...storyblokEditable(blok)} numberOfColumns={blok.numberOfCols}>
		{blok.columns.map((nestedBlok) => (
			<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		))}
	</MfGrid>
);

export default Grid;
