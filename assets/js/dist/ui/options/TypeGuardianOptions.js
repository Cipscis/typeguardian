import { isIndentation } from './Indentation.js';
/**
 * Typeguard function for {@linkcode TypeGuardianOptions}
 *
 * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v1.0.1
 */
export function isTypeGuardianOptions(testData) {
    const data = testData;
    if (!(typeof data === 'object' &&
        data !== null)) {
        return false;
    }
    if (!(isIndentation(data.indentation))) {
        return false;
    }
    return true;
}
//# sourceMappingURL=TypeGuardianOptions.js.map