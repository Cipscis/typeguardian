import { EnumTypeOf } from '../util/EnumTypeOf.js';

/**
 * CSS classes that are manipulated with JavaScript
 */
export const CssClass = {
	ERROR: 'has-error',

	TOAST_CONTAINER: 'toast__container',
	TOAST: 'toast',
} as const;
export type CssClass = EnumTypeOf<typeof CssClass>;
