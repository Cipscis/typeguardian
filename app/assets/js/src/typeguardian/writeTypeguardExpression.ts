import { writeIndentation } from './writeIndentation.js';
import { writeTypeGuardName } from './writeTypeguardName.js';

/**
 * Write a typeguard expression for a single type, i.e. not an object with properties.
 */
export function writeTypeguardExpression(propName: string, propType: string, indent = '    ', indentLevel = 0): string {
	const baseIndent = writeIndentation(indent, indentLevel);

	/** These primitives can be checked via the `typeof` operator */
	const typeofPrimitives = ['boolean', 'number', 'string', 'undefined'];

	const unionSplitPattern = /\s*\|\s*/;

	/** Array types can be specified via `Array<Type>` or `Type[]` */
	const arrayPattern = /^(Array<(.+?)>|(.+?)\[\])$/;

	/** Name convention: custom types use PascalCase */
	const customTypePattern = /^([A-Z][a-z]+)+$/;

	// `typeof` checks
	if (typeofPrimitives.includes(propType)) {
		return `typeof data.${propName} === '${propType}'`;
	}

	// `null` checks
	if (propType === 'null') {
		return `data.${propName} === null`;
	}

	// Array types
	const arrayMatch = propType.match(arrayPattern);
	if (arrayMatch) {
		const innerType = arrayMatch[2] ?? arrayMatch[3];

		return `
${baseIndent}${indent}Array.isArray(data.${propName}) &&
${baseIndent}${indent}data.${propName}.every(${
	innerType.match(customTypePattern)
		? writeTypeGuardName(innerType)
		: `() => ${writeTypeguardExpression(propName, innerType, indent, indentLevel + 1)}`
})
${baseIndent}`;
	}

	// Union types
	// TODO: Don't split on unions within an array type
	const unionMembers = propType.split(unionSplitPattern);

	const dedupedUnionMembers = [...new Set(unionMembers)];
	if (unionMembers.length !== dedupedUnionMembers.length) {
		console.warn(`WARNING: Duplicate union member detected in type ${propType}`);
	}

	if (unionMembers.length > 1) {
		return `
${baseIndent}${indent}${unionMembers.map((type) => writeTypeguardExpression(propName, type, indent, indentLevel + 1)).join(` ||\n${baseIndent}${indent}`)}
${baseIndent}`;
	}

	// Custom types
	const isCustomType = (customTypePattern).test(propType);
	if (isCustomType) {
		return `${writeTypeGuardName(propType)}(data.${propName})`;
	}

	// Unrecognised pattern, left to developer to implement
	return `false /* TODO: implement typeguard for \`${propName}: ${propType}\`*/`;
}
