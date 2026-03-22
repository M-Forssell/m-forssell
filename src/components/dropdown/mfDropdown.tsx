import classNames from 'classnames/bind';
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

export default function MfDropdown({
	label,
	name,
	options,
	placeholder,
	required = false,
	disabled = false,
	defaultValue,
	error,
	className,
}: DropdownProps) {
	const cx = classNames.bind(styles);

	const wrapperClass = cx({
		[`${className}`]: !!className,
		[`${baseClass}`]: true,
		[`${baseClass}--error`]: !!error,
		[`${baseClass}--disabled`]: disabled,
	});

	const selectId = `${baseClass}-${name}`;

	return (
		<div className={wrapperClass}>
			<label htmlFor={selectId} className={cx(`${baseClass}__label`)}>
				{label}
				{required && <span aria-hidden="true"> *</span>}
			</label>
			<select
				id={selectId}
				name={name}
				required={required}
				disabled={disabled}
				defaultValue={defaultValue}
				className={cx(`${baseClass}__select`)}
				aria-invalid={!!error}
				aria-describedby={error ? `${selectId}-error` : undefined}
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
			{error && (
				<p
					id={`${selectId}-error`}
					className={cx(`${baseClass}__error`)}
					role="alert"
				>
					{error}
				</p>
			)}
		</div>
	);
}
