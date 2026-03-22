'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { t } from '@/lib/i18n';
import { useFormField } from '@/components/form/formContext';
import { validateElement } from '@/components/form/validation';
import styles from './mfTextInput.module.scss';

type TextInputProps = {
	label: string;
	name: string;
	type?: 'text' | 'email' | 'tel' | 'url';
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	defaultValue?: string;
	error?: string;
	className?: string;
};

const baseClass = 'mf-text-input';
const i18n = t();

export default function MfTextInput({
	label,
	name,
	type = 'text',
	placeholder,
	required = false,
	disabled = false,
	defaultValue,
	error: errorProp,
	className,
}: TextInputProps) {
	const cx = classNames.bind(styles);
	const { error: contextError, setError, clearError } = useFormField(name);
	const error = errorProp || contextError;

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

	const inputId = `${baseClass}-${name}`;

	return (
		<div className={wrapperClass}>
			<div className={cx(`${baseClass}__label-row`)}>
				<label htmlFor={inputId} className={cx(`${baseClass}__label`)}>
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
						id={`${inputId}-error`}
						role="alert"
					>
						{error}
					</span>
				)}
			</div>
			<div className={cx(`${baseClass}__input-wrapper`)}>
				{error && (
					<span className={cx(`${baseClass}__error-icon`)} aria-hidden="true">
						<FontAwesomeIcon icon={faCircleExclamation} />
					</span>
				)}
				<input
					id={inputId}
					name={name}
					type={type}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					defaultValue={defaultValue}
					className={cx(`${baseClass}__input`)}
					aria-invalid={!!error}
					aria-describedby={error ? `${inputId}-error` : undefined}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}
