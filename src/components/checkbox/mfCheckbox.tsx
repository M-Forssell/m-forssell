import classNames from 'classnames/bind';
import styles from './mfCheckbox.module.scss';

type CheckboxProps = {
	label: string;
	name: string;
	required?: boolean;
	disabled?: boolean;
	defaultChecked?: boolean;
	error?: string;
	className?: string;
};

const baseClass = 'mf-checkbox';

export default function MfCheckbox({
	label,
	name,
	required = false,
	disabled = false,
	defaultChecked,
	error,
	className,
}: CheckboxProps) {
	const cx = classNames.bind(styles);

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
				/>
				<label htmlFor={checkboxId} className={cx(`${baseClass}__label`)}>
					{label}
					{required && <span aria-hidden="true"> *</span>}
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
