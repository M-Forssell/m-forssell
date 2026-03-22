import classNames from 'classnames/bind';
import styles from './mfTextarea.module.scss';

type TextareaProps = {
	label: string;
	name: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	defaultValue?: string;
	error?: string;
	className?: string;
	rows?: number;
};

const baseClass = 'mf-textarea';

export default function MfTextarea({
	label,
	name,
	placeholder,
	required = false,
	disabled = false,
	defaultValue,
	error,
	className,
	rows = 4,
}: TextareaProps) {
	const cx = classNames.bind(styles);

	const wrapperClass = cx({
		[`${className}`]: !!className,
		[`${baseClass}`]: true,
		[`${baseClass}--error`]: !!error,
		[`${baseClass}--disabled`]: disabled,
	});

	const textareaId = `${baseClass}-${name}`;

	return (
		<div className={wrapperClass}>
			<label htmlFor={textareaId} className={cx(`${baseClass}__label`)}>
				{label}
				{required && <span aria-hidden="true"> *</span>}
			</label>
			<textarea
				id={textareaId}
				name={name}
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				defaultValue={defaultValue}
				rows={rows}
				className={cx(`${baseClass}__textarea`)}
				aria-invalid={!!error}
				aria-describedby={error ? `${textareaId}-error` : undefined}
			/>
			{error && (
				<p
					id={`${textareaId}-error`}
					className={cx(`${baseClass}__error`)}
					role="alert"
				>
					{error}
				</p>
			)}
		</div>
	);
}
