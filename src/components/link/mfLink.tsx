import Link from 'next/link';
import styles from './mfLink.module.scss';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
type MfLinkProps = {
	href: string;
	children: React.ReactNode;
	rel?: string;
	target?: string;
	icon?: IconDefinition;
};
const MfLink = ({ href, children, rel, target, icon }: MfLinkProps) => {
	return (
		<Link href={href} rel={rel} target={target} className={styles.mfLink}>
			{icon && (
				<span className={styles['mfLink--icon']}>
					<FontAwesomeIcon icon={icon} />
				</span>
			)}
			{children}
		</Link>
	);
};

export default MfLink;
