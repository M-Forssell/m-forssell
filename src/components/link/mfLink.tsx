import Link from 'next/link';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './mfLink.module.scss';

type MfLinkProps = {
	href: string;
	children: React.ReactNode;
	rel?: string;
	target?: string;
	icon?: IconDefinition;
	variant?: 'contact' | 'outline' | 'cta';
	showValue?: boolean;
};

const MfLink = ({
	href,
	children,
	rel,
	target,
	icon,
	variant,
	showValue = true,
}: MfLinkProps) => {
	const cx = classNames.bind(styles);
	const linkClasses = cx('mfLink', {
		'mfLink--contact': variant === 'contact',
		'mfLink--outline': variant === 'outline',
		'mfLink--cta': variant === 'cta',
		'mfLink--has-icon': !!icon,
	});

	return (
		<Link href={href} rel={rel} target={target} className={linkClasses}>
			{icon && (
				<span className={styles['mfLink__icon']}>
					<FontAwesomeIcon icon={icon} />
				</span>
			)}
			<span className={styles.mfLink__content}>
				{variant === 'contact' ? (
					<>
						<span className={cx('mfLink--contact__label')}>{children}</span>
						{showValue && (
							<span className={cx('mfLink--contact__value link-value')}>
								{href.replace(/^(mailto:|tel:)/, '')}
							</span>
						)}
					</>
				) : (
					children
				)}
			</span>
		</Link>
	);
};

export default MfLink;
