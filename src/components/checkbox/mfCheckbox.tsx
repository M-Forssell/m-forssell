'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { t } from '@/lib/i18n';
import { useFormField } from '@/components/form/formContext';
import { validateElement } from '@/components/form/validation';
import styles from './mfCheckbox.module.scss';

type CheckboxProps = {
	label: string;
	name: string;
	required?: boolean;
	disabled?: boolean;
	defaultChecked?: boolean;
	error?: string;
	className?: string;
	linkText?: string;
	linkUrl?: string;
};

const baseClass = 'mf-checkbox';
const i18n = t();

function renderLabel(label: string, linkText?: string, linkUrl?: string) {
	if (linkText && linkUrl && label.includes(linkText)) {
		const index = label.indexOf(linkText);
		return (
			<>
				{label.slice(0, index)}
				<a href={linkUrl} target="_blank" rel="noopener noreferrer">
					{linkText}
				</a>
				{label.slice(index + linkText.length)}
			</>
		);
	}
	return label;
}

export default function MfCheckbox({
	label,
	name,
	required = false,
	disabled = false,
	defaultChecked,
	error: errorProp,
	className,
	linkText,
	linkUrl,
}: CheckboxProps) {
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

	const checkboxId = `${baseClass}-${name}`;

	return (
		<div>
			<div className={wrapperClass}>
				{error && (
					<span className={cx(`${baseClass}__error-icon`)} aria-hidden="true">
						<FontAwesomeIcon icon={faCircleExclamation} />
					</span>
				)}
				<input
					id={checkboxId}
					name={name}
					type="checkbox"
					required={required}
					disabled={disabled}
					defaultChecked={defaultChecked}
					className={cx(`${baseClass}__input`)}
					aria-invalid={!!error}
					aria-describedby={error ? `${checkboxId}-error` : undefined}
					onChange={handleChange}
				/>
				<label htmlFor={checkboxId} className={cx(`${baseClass}__label`)}>
					{renderLabel(label, linkText, linkUrl)}
					{!required && (
						<span className={cx(`${baseClass}__optional`)}>
							{' '}
							{i18n.form.optional}
						</span>
					)}
				</label>
			</div>
			{error && (
				<p
					id={`${checkboxId}-error`}
					className={cx(`${baseClass}__error`)}
					role="alert"
				>
					{error}
				</p>
			)}
		</div>
	);
}
