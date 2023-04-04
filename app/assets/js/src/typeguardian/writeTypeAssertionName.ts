/**
 * Write the name of a custom type's type assertion function in a systematic way.
 *
 * For example, the type `CustomType` would have a type assertion function `assertIsCustomType`.
 */
export function writeTypeAssertionName(typeName: string): string {
	return `assertIs${typeName}`;
}
