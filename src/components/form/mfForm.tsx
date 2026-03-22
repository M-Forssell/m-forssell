'use client';

import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import { t } from '@/lib/i18n';
import styles from './mfForm.module.scss';
import { FormContext } from './formContext';
import { validateElement } from './validation';

type FormProps = {
	children: React.ReactNode;
	formName: string;
	action?: string;
	submitLabel?: string;
	className?: string;
};

const baseClass = 'mf-form';
const i18n = t();

export default function MfForm({
	children,
	formName,
	action,
	submitLabel,
	className,
}: FormProps) {
	const cx = classNames.bind(styles);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

	const setFieldError = useCallback((name: string, message: string) => {
		setFieldErrors((prev) => ({ ...prev, [name]: message }));
	}, []);

	const clearFieldError = useCallback((name: string) => {
		setFieldErrors((prev) => {
			if (!prev[name]) return prev;
			const next = { ...prev };
			delete next[name];
			return next;
		});
	}, []);

	const formClass = cx({
		[`${className}`]: !!className,
		[`${baseClass}`]: true,
	});

	function validate(form: HTMLFormElement): boolean {
		const errors: Record<string, string> = {};
		const elements = form.elements;

		for (let i = 0; i < elements.length; i++) {
			const el = elements[i] as
				| HTMLInputElement
				| HTMLSelectElement
				| HTMLTextAreaElement;
			if (!el.name || el.type === 'hidden' || el.name === 'bot-field') continue;

			const error = validateElement(el);
			if (error) {
				errors[el.name] = error;
			}
		}

		setFieldErrors(errors);

		const errorKeys = Object.keys(errors);
		if (errorKeys.length > 0) {
			const firstInvalidName = errorKeys[0]!;
			const firstInvalid = form.elements.namedItem(
				firstInvalidName,
			) as HTMLElement | null;
			firstInvalid?.focus();
			return false;
		}

		return true;
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSubmitError(null);

		const form = e.currentTarget;

		if (!validate(form)) return;

		const formData = new FormData(form);

		try {
			const response = await fetch(action || '/__forms.html', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				setSubmitError(i18n.form.error.submitFailed(response.status));
				return;
			}

			const redirectUrl = response.redirected
				? response.url
				: response.headers.get('Location');
			if (redirectUrl) {
				window.location.href = redirectUrl;
			}
		} catch (err) {
			setSubmitError(
				err instanceof Error ? err.message : i18n.form.error.networkError,
			);
		}
	}

	return (
		<FormContext.Provider
			value={{ fieldErrors, setFieldError, clearFieldError }}
		>
			<form
				className={formClass}
				name={formName}
				onSubmit={handleSubmit}
				noValidate
			>
				<input type="hidden" name="form-name" value={formName} />
				<p hidden>
					<label>
						Don&apos;t fill this out: <input name="bot-field" />
					</label>
				</p>
				{children}
				<button type="submit" className={cx(`${baseClass}__submit`)}>
					{submitLabel || i18n.form.submit}
				</button>
				{submitError && (
					<p className={cx(`${baseClass}__error`)} role="alert">
						{submitError}
					</p>
				)}
			</form>
		</FormContext.Provider>
	);
}
