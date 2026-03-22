'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { t } from '@/lib/i18n';
import { useFormField } from '@/components/form/formContext';
import { validateElement } from '@/components/form/validation';
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
const i18n = t();

export default function MfTextarea({
	label,
	name,
	placeholder,
	required = false,
	disabled = false,
	defaultValue,
	error: errorProp,
	className,
	rows = 4,
}: TextareaProps) {
	const cx = classNames.bind(styles);
	const { error: contextError, setError, clearError } = useFormField(name);
	const error = errorProp || contextError;

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		if (!error) return;
		const msg = validateElement(e.target);
		if (msg) {
			setError(msg);
		} else {
			clearError();
		}
	}

	const wrapperClass = cx({
		[`${className}`]: !!className,
		[`${baseClass}`]: true,
		[`${baseClass}--error`]: !!error,
		[`${baseClass}--disabled`]: disabled,
	});

	const textareaId = `${baseClass}-${name}`;

	return (
		<div className={wrapperClass}>
			<div className={cx(`${baseClass}__label-row`)}>
				<label htmlFor={textareaId} className={cx(`${baseClass}__label`)}>
					{label}
					{!required && (
						<span className={cx(`${baseClass}__optional`)}>
							{' '}
							{i18n.form.optional}
						</span>
					)}
				</label>
				{error && (
					<span
						className={cx(`${baseClass}__error-text`)}
						id={`${textareaId}-error`}
						role="alert"
					>
						{error}
					</span>
				)}
			</div>
			<div className={cx(`${baseClass}__textarea-wrapper`)}>
				{error && (
					<span className={cx(`${baseClass}__error-icon`)} aria-hidden="true">
						<FontAwesomeIcon icon={faCircleExclamation} />
					</span>
				)}
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
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
