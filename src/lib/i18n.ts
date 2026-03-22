export type Locale = 'sv' | 'en';

type Translations = {
	form: {
		optional: string;
		submit: string;
		validation: {
			required: string;
			emailInvalid: string;
			urlInvalid: string;
			patternMismatch: string;
			tooShort: string;
			tooLong: string;
			invalid: string;
		};
		error: {
			submitFailed: (status: number) => string;
			networkError: string;
		};
	};
};

const sv: Translations = {
	form: {
		optional: '(valfritt)',
		submit: 'Skicka',
		validation: {
			required: 'Detta fält är obligatoriskt.',
			emailInvalid: 'Ange en giltig e-postadress.',
			urlInvalid: 'Ange en giltig URL.',
			patternMismatch: 'Ogiltigt format.',
			tooShort: 'Värdet är för kort.',
			tooLong: 'Värdet är för långt.',
			invalid: 'Ogiltigt värde.',
		},
		error: {
			submitFailed: (status: number) =>
				`Något gick fel (${status}). Försök igen senare.`,
			networkError: 'Något gick fel. Försök igen senare.',
		},
	},
};

const en: Translations = {
	form: {
		optional: '(optional)',
		submit: 'Submit',
		validation: {
			required: 'This field is required.',
			emailInvalid: 'Please enter a valid email address.',
			urlInvalid: 'Please enter a valid URL.',
			patternMismatch: 'Invalid format.',
			tooShort: 'The value is too short.',
			tooLong: 'The value is too long.',
			invalid: 'Invalid value.',
		},
		error: {
			submitFailed: (status: number) =>
				`Something went wrong (${status}). Please try again later.`,
			networkError: 'Something went wrong. Please try again later.',
		},
	},
};

const translations: Record<Locale, Translations> = { sv, en };

const DEFAULT_LOCALE: Locale = 'sv';

export function t(locale: Locale = DEFAULT_LOCALE): Translations {
	return translations[locale];
}
