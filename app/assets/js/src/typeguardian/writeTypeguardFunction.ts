import { TypeDef } from './TypeDef.js';
import { readTypeDef } from './readTypeDef.js';
import { writeTypeguardExpression } from './writeTypeguardExpression.js';
import { version } from './version.js';

/**
 * Write a typeguard function for an object type with properties.
 *
 * This function is intended to be used for generating code, not actually run within the browser.
 */
export function writeTypeguardFunction(typedef: TypeDef, indent?: string): string
export function writeTypeguardFunction(typedefString: string, indent?: string): string
export function writeTypeguardFunction(typedefArg: TypeDef | string, indent = '    '): string {
	const typedef = typeof typedefArg === 'string' ? readTypeDef(typedefArg) : typedefArg;

	const {
		name,
		props,
	} = typedef;

	const typeguard = `/**
 * Typeguard function for {@linkcode ${name}}
 *
 * Generated with {@link TypeGuardian https://cipscis.github.io/typeguardian} v${version}
 */
function is${name}(testData: unknown): testData is ${name} {
${indent}const data = testData as ${name};

${indent}if (!(
${indent}${indent}typeof data === 'object' &&
${indent}${indent}data !== null
${indent})) {
${indent}${indent}return false;
${indent}}

${indent}${props.map(([propName, propType]) => `if (!(${writeTypeguardExpression(propName, propType, indent, 1)})) {
${indent}${indent}return false;
${indent}}`).join(`\n\n${indent}`)}

${indent}return true;
}`;

	return typeguard;
}
