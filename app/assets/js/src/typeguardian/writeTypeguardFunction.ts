import { TypeDef } from './TypeDef.js';
import { readTypeDef } from './readTypeDef.js';
import { writeTypeguardExpression } from './writeTypeguardExpression.js';
import { version } from './version.js';
import { writeTypeguardName } from './writeTypeguardName.js';

/**
 * Write a typeguard function for an object type with properties.
 *
 * This function is intended to be used for generating code, not actually run within the browser.
 */
export function writeTypeguardFunction(typeDef: TypeDef, indent?: string): string
export function writeTypeguardFunction(typeDefString: string, indent?: string): string
export function writeTypeguardFunction(typeDefArg: TypeDef | string, indent = '    '): string {
	const typeDef = typeof typeDefArg === 'string' ? readTypeDef(typeDefArg) : typeDefArg;

	const {
		name,
		extendedInterface,
		props,
		exported,
	} = typeDef;

	const typeguard = `/**
 * Typeguard function for {@linkcode ${name}}
 *
 * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v${version}
 */
${exported ? 'export ' : ''}function ${writeTypeguardName(name)}(testData: unknown): testData is ${name} {
${indent}const data = testData as ${name};

${
	extendedInterface
	? `${indent}if (!(${writeTypeguardName(extendedInterface)}(data))) {
${indent}${indent}return false;
${indent}}`
	: `${indent}if (!(
${indent}${indent}typeof data === 'object' &&
${indent}${indent}data !== null
${indent})) {
${indent}${indent}return false;
${indent}}`
}

${indent}${props.map(([propName, propType]) => `if (!(${writeTypeguardExpression(propName, propType, {
	indent,
	indentLevel: 1,
})})) {
${indent}${indent}return false;
${indent}}`).join(`\n\n${indent}`)}

${indent}return true;
}
`;

	return typeguard;
}
