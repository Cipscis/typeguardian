import { EnumTypeOf } from '../util/EnumTypeOf.js';
/**
 * CSS classes that are manipulated with JavaScript
 */
export declare const CssClass: {
    readonly ERROR: "has-error";
    readonly TOAST_CONTAINER: "toast__container";
    readonly TOAST: "toast";
};
export type CssClass = EnumTypeOf<typeof CssClass>;
