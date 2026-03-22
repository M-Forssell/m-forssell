import classNames from 'classnames/bind';
import Image from 'next/image';
import type { RichTextNode } from '@/components/rich-text/rich-text-types';
import RichText from '@/components/rich-text/rich-text';
import HTag from '@/components/hTag/mfHtag';
import type { HeadingLevels } from '@/types/componentTypes';
import styles from './mfSuccess.module.scss';

type SuccessProps = {
	title: string;
	headingLevel?: HeadingLevels;
	content?: RichTextNode[];
	image?: {
		filename: string;
		alt: string | null;
	};
	className?: string;
};

const baseClass = 'mf-success';

export default function MfSuccess({
	title,
	headingLevel = 'h1',
	content,
	image,
	className,
}: SuccessProps) {
	const cx = classNames.bind(styles);

	const wrapperClass = cx({
		[`${className}`]: !!className,
		[`${baseClass}`]: true,
	});

	return (
		<div className={wrapperClass}>
			{image?.filename && (
				<Image
					src={image.filename}
					alt={image.alt || ''}
					width={480}
					height={320}
					className={cx(`${baseClass}__image`)}
				/>
			)}
			<HTag tag={headingLevel}>{title}</HTag>
			{content && content.length > 0 && (
				<div className={cx(`${baseClass}__text`)}>
					<RichText content={content} />
				</div>
			)}
		</div>
	);
}
