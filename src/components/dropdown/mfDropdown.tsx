'use client';

import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { t } from '@/lib/i18n';
import { useFormField } from '@/components/form/formContext';
import { validateElement } from '@/components/form/validation';
import styles from './mfDropdown.module.scss';

export type DropdownOption = {
	label: string;
	value: string;
};

type DropdownProps = {
	label: string;
	name: string;
	options: DropdownOption[];
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	defaultValue?: string;
	error?: string;
	className?: string;
};

const baseClass = 'mf-dropdown';
const i18n = t();

export default function MfDropdown({
	label,
	name,
	options,
	placeholder,
	required = false,
	disabled = false,
	defaultValue,
	error: errorProp,
	className,
}: DropdownProps) {
	const cx = classNames.bind(styles);
	const { error: contextError, setError, clearError } = useFormField(name);
	const error = errorProp || contextError;

	function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
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

	const selectId = `${baseClass}-${name}`;

	return (
		<div className={wrapperClass}>
			<div className={cx(`${baseClass}__label-row`)}>
				<label htmlFor={selectId} className={cx(`${baseClass}__label`)}>
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
						id={`${selectId}-error`}
						role="alert"
					>
						{error}
					</span>
				)}
			</div>
			<div className={cx(`${baseClass}__select-wrapper`)}>
				{error && (
					<span className={cx(`${baseClass}__error-icon`)} aria-hidden="true">
						<FontAwesomeIcon icon={faCircleExclamation} />
					</span>
				)}
				<select
					id={selectId}
					name={name}
					required={required}
					disabled={disabled}
					defaultValue={defaultValue}
					className={cx(`${baseClass}__select`)}
					aria-invalid={!!error}
					aria-describedby={error ? `${selectId}-error` : undefined}
					onChange={handleChange}
				>
					{placeholder && (
						<option value="" disabled>
							{placeholder}
						</option>
					)}
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
