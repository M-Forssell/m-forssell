import HTag from '@/components/hTag/mfHtag';
type HeadingProps = {
	blok: {
		_uid: string;
		title: string;
		level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	};
};
const Heading = ({ blok }: HeadingProps) => {
	return (
		<HTag tag={blok.level} size="lg">
			{blok.title}
		</HTag>
	);
};

export default Heading;
