import { EnumTypeOf } from '../util/EnumTypeOf.js';

/**
 * Selectors used to interface with the DOM.
 */
export const Selector = {
	INSTANCE: '.js-typeguardian',
	INPUT: '.js-typeguardian__input',
	OUTPUT: '.js-typeguardian__output',

	GENERATE: '.js-typeguardian__generate',
	COPY: '.js-typeguardian__copy',

	USE_ASSERTIONS: '.js-typeguardian__use-assertions',
	INDENTATION: '.js-typeguardian__indentation',

	TOAST: '.js-toast',
} as const;
export type Selector = EnumTypeOf<typeof Selector>;
