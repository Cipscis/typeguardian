import { TypeDef } from './TypeDef.js';
/**
 * Write a typeguard function for an object type with properties.
 *
 * This function is intended to be used for generating code, not actually run within the browser.
 */
export declare function writeTypeguardFunction(typedef: TypeDef, indent?: string): string;
export declare function writeTypeguardFunction(typedefString: string, indent?: string): string;
