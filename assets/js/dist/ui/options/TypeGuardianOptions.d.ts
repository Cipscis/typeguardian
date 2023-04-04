import { Indentation } from './Indentation.js';
export interface TypeGuardianOptions {
    allowEnhancedDebugging: boolean;
    indentation: Indentation;
}
/**
 * Typeguard function for {@linkcode TypeGuardianOptions}
 *
 * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v1.1.0
 */
export declare function isTypeGuardianOptions(testData: unknown): testData is TypeGuardianOptions;
