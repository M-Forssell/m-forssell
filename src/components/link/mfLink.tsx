import Link from 'next/link';
import styles from './mfLink.module.scss';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

type MfLinkProps = {
	href: string;
	children: React.ReactNode;
	rel?: string;
	target?: string;
	icon?: IconDefinition;
	variant?: 'contact';
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
	const linkClasses = cx(styles.mfLink, {
		[styles.mfLink]: true,
		[styles['mfLink--contact']]: variant === 'contact',
		[styles['mfLink--has-icon']]: !!icon,
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
