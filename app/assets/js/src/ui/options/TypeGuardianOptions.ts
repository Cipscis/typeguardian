import { Indentation, isIndentation } from './Indentation.js';

export interface TypeGuardianOptions {
	useAssertions: boolean;
	indentation: Indentation;
}
/**
 * Typeguard function for {@linkcode TypeGuardianOptions}
 *
 * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v1.1.0
 */
export function isTypeGuardianOptions(testData: unknown): testData is TypeGuardianOptions {
	const data = testData as TypeGuardianOptions;

	if (!(
		typeof data === 'object' &&
		data !== null
	)) {
		return false;
	}

	if (!(typeof data.useAssertions === 'boolean')) {
		return false;
	}

	if (!(isIndentation(data.indentation))) {
		return false;
	}

	return true;
}
