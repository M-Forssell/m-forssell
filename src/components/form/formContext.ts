'use client';

import { createContext, useContext } from 'react';

type FormContextValue = {
	fieldErrors: Record<string, string>;
	setFieldError: (name: string, message: string) => void;
	clearFieldError: (name: string) => void;
};

export const FormContext = createContext<FormContextValue>({
	fieldErrors: {},
	setFieldError: () => {},
	clearFieldError: () => {},
});

export function useFormField(name: string) {
	const { fieldErrors, setFieldError, clearFieldError } =
		useContext(FormContext);
	return {
		error: fieldErrors[name] || null,
		setError: (message: string) => setFieldError(name, message),
		clearError: () => clearFieldError(name),
	};
}
