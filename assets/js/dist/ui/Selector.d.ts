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
    readonly ALLOW_ENHANCED_DEBUGGING: ".js-typeguardian__allow-enhanced-debugging";
    readonly INDENTATION: ".js-typeguardian__indentation";
    readonly TOAST: ".js-toast";
};
export type Selector = EnumTypeOf<typeof Selector>;
