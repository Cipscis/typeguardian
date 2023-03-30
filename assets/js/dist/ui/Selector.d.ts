import { EnumTypeOf } from '../util/EnumTypeOf.js';
/**
 * Selectors used to interface with the DOM.
 */
export declare const Selector: {
    readonly INSTANCE: ".js-typeguardian";
    readonly INPUT: ".js-typeguardian__input";
    readonly OUTPUT: ".js-typeguardian__output";
    readonly GENERATE: ".js-typeguardian__generate";
    readonly COPY: ".js-typeguardian__copy";
    readonly TOAST: ".js-toast";
};
export type Selector = EnumTypeOf<typeof Selector>;
