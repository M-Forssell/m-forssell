import { t } from '@/lib/i18n';

const i18n = t();

const typeMismatchMessages: Record<string, string> = {
	email: i18n.form.validation.emailInvalid,
	url: i18n.form.validation.urlInvalid,
};

type ValidatableElement =
	| HTMLInputElement
	| HTMLSelectElement
	| HTMLTextAreaElement;

export function getValidationMessage(element: ValidatableElement): string {
	const validity = element.validity;

	if (validity.valueMissing) return i18n.form.validation.required;
	if (validity.typeMismatch)
		return typeMismatchMessages[element.type] ?? i18n.form.validation.invalid;
	if (validity.patternMismatch) return i18n.form.validation.patternMismatch;
	if (validity.tooShort) return i18n.form.validation.tooShort;
	if (validity.tooLong) return i18n.form.validation.tooLong;

	return element.validationMessage || i18n.form.validation.invalid;
}

export function validateElement(element: ValidatableElement): string | null {
	if (element.checkValidity()) return null;
	return getValidationMessage(element);
}
