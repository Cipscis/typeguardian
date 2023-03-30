import { EnumTypeOf } from '../util/EnumTypeOf.js';

/**
 * CSS classes that are manipulated with JavaScript
 */
export const CssClass = {
	ERROR: 'has-error',
} as const;
export type CssClass = EnumTypeOf<typeof CssClass>;
