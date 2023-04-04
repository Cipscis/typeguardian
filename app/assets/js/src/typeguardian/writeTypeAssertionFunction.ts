import { TypeDef } from './TypeDef.js';
import { readTypeDef } from './readTypeDef.js';
import { writeTypeguardExpression } from './writeTypeguardExpression.js';
import { version } from './version.js';
import { writeTypeAssertionName } from './writeTypeAssertionName.js';
import { writeTypeguardName } from './writeTypeguardName.js';

/**
 * Write a typeguard function for an object type with properties.
 *
 * This function is intended to be used for generating code, not actually run within the browser.
 */
export function writeTypeAssertionFunction(typedef: TypeDef, indent?: string): string
export function writeTypeAssertionFunction(typedefString: string, indent?: string): string
export function writeTypeAssertionFunction(typedefArg: TypeDef | string, indent = '    '): string {
	const typedef = typeof typedefArg === 'string' ? readTypeDef(typedefArg) : typedefArg;

	const {
		name,
		props,
		exported,
	} = typedef;

	const typeAssertion = `/**
 * Type assertion function for {@linkcode ${name}}
 *
 * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v${version}
 */
function ${writeTypeAssertionName(name)}(testData: unknown): asserts testData is ${name} {
${indent}const data = testData as ${name};

${indent}if (!(
${indent}${indent}typeof data === 'object' &&
${indent}${indent}data !== null
${indent})) {
${indent}${indent}throw new TypeError(\`Tested value was not an object\`);
${indent}}

${indent}${props.map(([propName, propType]) => `if (!(${writeTypeguardExpression(propName, propType, {
	indent,
	indentLevel: 1,
})})) {
${indent}${indent}throw new TypeError(\`${name} type assertion failed: Property ${propName} was not of type \\\`${propType}\\\`\`);
${indent}}`).join(`\n\n${indent}`)}
}
`;

	const typeguard = `/**
 * Typeguard function for {@linkcode ${name}}
 *
 * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v${version}
 *
 * @param [logger] A function that can log errors specifying exactly where the typeguard failed.
 */
${exported ? 'export ' : ''}function ${writeTypeguardName(name)}(testData: unknown, logger?: (message: string) => void): testData is ${name} {
${indent}try {
${indent}${indent}${writeTypeAssertionName(name)}(testData);
${indent}${indent}return true;
${indent}} catch (e) {
${indent}${indent}if (logger) {
${indent}${indent}${indent}logger(e instanceof Error ? e.message : String(e));
${indent}${indent}}
${indent}${indent}return false;
${indent}}
}
`;

	return `${typeAssertion}\n${typeguard}`;
}
