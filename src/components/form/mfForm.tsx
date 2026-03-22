import classNames from 'classnames/bind';
import styles from './mfForm.module.scss';

type FormProps = {
	children: React.ReactNode;
	formName: string;
	action?: string;
	submitLabel?: string;
	successMessage?: string;
	errorMessage?: string;
	className?: string;
};

const baseClass = 'mf-form';

export default function MfForm({
	children,
	formName,
	action,
	submitLabel = 'Submit',
	successMessage,
	errorMessage,
	className,
}: FormProps) {
	const cx = classNames.bind(styles);

	const formClass = cx({
		[`${className}`]: !!className,
		[`${baseClass}`]: true,
	});

	return (
		<form
			className={formClass}
			name={formName}
			method="POST"
			action={action}
			data-netlify="true"
			netlify-honeypot="bot-field"
		>
			<input type="hidden" name="form-name" value={formName} />
			<p hidden>
				<label>
					Don&apos;t fill this out: <input name="bot-field" />
				</label>
			</p>
			{children}
			<button type="submit" className={cx(`${baseClass}__submit`)}>
				{submitLabel}
			</button>
			{successMessage && (
				<p className={cx(`${baseClass}__success`)} role="status">
					{successMessage}
				</p>
			)}
			{errorMessage && (
				<p className={cx(`${baseClass}__error`)} role="alert">
					{errorMessage}
				</p>
			)}
		</form>
	);
}
