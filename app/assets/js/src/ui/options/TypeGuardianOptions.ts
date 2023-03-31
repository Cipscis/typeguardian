import { Indentation, isIndentation } from './Indentation.js';

export interface TypeGuardianOptions {
	indentation: Indentation;
}
/**
 * Typeguard function for {@linkcode TypeGuardianOptions}
 *
 * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v1.0.1
 */
export function isTypeGuardianOptions(testData: unknown): testData is TypeGuardianOptions {
	const data = testData as TypeGuardianOptions;

	if (!(
		typeof data === 'object' &&
		data !== null
	)) {
		return false;
	}

	if (!(isIndentation(data.indentation))) {
		return false;
	}

	return true;
}
