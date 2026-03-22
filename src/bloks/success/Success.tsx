import { storyblokEditable } from '@storyblok/react/rsc';
import type { SuccessBlok } from '@/types/storyblok';
import MfSuccess from '@/components/success/mfSuccess';

type SuccessProps = {
	blok: SuccessBlok;
};

const Success = ({ blok }: SuccessProps) => {
	return (
		<div {...storyblokEditable(blok)}>
			<MfSuccess
				title={blok.title}
				headingLevel={blok.headingLevel}
				content={blok.content?.content}
				image={
					blok.image?.filename
						? { filename: blok.image.filename, alt: blok.image.alt }
						: undefined
				}
			/>
		</div>
	);
};

export default Success;
