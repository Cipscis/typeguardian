/**
 * Write the name of a custom type's typeguard function in a systematic way.
 *
 * For example, the type `CustomType` would have a typeguard function `isCustomType`.
 */
export function writeTypeGuardName(typeName: string): string {
	return `is${typeName}`;
}
