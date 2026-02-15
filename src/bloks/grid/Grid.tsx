import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';
import type { GridBlok } from '@/types/storyblok';
import MfGrid from '@/components/grid/mfGrid';

type GridProps = {
	blok: GridBlok;
	nested?: boolean;
};

const Grid = ({ blok, nested = false }: GridProps) => (
	<MfGrid
		{...storyblokEditable(blok)}
		numberOfColumns={blok.numberOfCols}
		nested={nested}
	>
		{blok.columns.map((nestedBlok) => (
			<StoryblokServerComponent
				blok={nestedBlok}
				key={nestedBlok._uid}
				{...(nestedBlok.component === 'grid' ? { nested: true } : {})}
			/>
		))}
	</MfGrid>
);

export default Grid;
