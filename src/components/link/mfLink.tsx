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
	iconPosition?: 'left' | 'right';
	variant?: 'contact' | 'outline' | 'cta';
	showValue?: boolean;
};

const MfLink = ({
	href,
	children,
	rel,
	target,
	icon,
	iconPosition = 'left',
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

	const iconElement = icon && (
		<span className={styles['mfLink__icon']}>
			<FontAwesomeIcon icon={icon} />
		</span>
	);

	return (
		<Link href={href} rel={rel} target={target} className={linkClasses}>
			{iconPosition === 'left' && iconElement}
			<span className={styles.mfLink__content}>
				{variant === 'contact' ? (
					<>
						<span className={cx('mfLink--contact__label')}>{children}</span>
						{showValue && /^(mailto:|tel:)/.test(href) && (
							<span className={cx('mfLink--contact__value link-value')}>
								{href.replace(/^(mailto:|tel:)/, '')}
							</span>
						)}
					</>
				) : (
					children
				)}
			</span>
			{iconPosition === 'right' && iconElement}
		</Link>
	);
};

export default MfLink;
