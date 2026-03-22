'use client';

import classNames from 'classnames/bind';
import styles from './mfTextInput.module.scss';

type TextInputProps = {
	label: string;
	name: string;
	type?: 'text' | 'email' | 'tel' | 'url';
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	className?: string;
};

const baseClass = 'mf-text-input';

export default function MfTextInput({
	label,
	name,
	type = 'text',
	placeholder,
	required = false,
	disabled = false,
	value,
	onChange,
	error,
	className,
}: TextInputProps) {
	const cx = classNames.bind(styles);

	const wrapperClass = cx({
		[`${className}`]: !!className,
		[`${baseClass}`]: true,
		[`${baseClass}--error`]: !!error,
		[`${baseClass}--disabled`]: disabled,
	});

	const inputId = `${baseClass}-${name}`;

	return (
		<div className={wrapperClass}>
			<label htmlFor={inputId} className={cx(`${baseClass}__label`)}>
				{label}
				{required && <span aria-hidden="true"> *</span>}
			</label>
			<input
				id={inputId}
				name={name}
				type={type}
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				value={value}
				onChange={onChange}
				className={cx(`${baseClass}__input`)}
				aria-invalid={!!error}
				aria-describedby={error ? `${inputId}-error` : undefined}
			/>
			{error && (
				<p
					id={`${inputId}-error`}
					className={cx(`${baseClass}__error`)}
					role="alert"
				>
					{error}
				</p>
			)}
		</div>
	);
}
