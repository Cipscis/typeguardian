import { writeIndentation } from './writeIndentation.js';
import { writeTypeguardName } from './writeTypeguardName.js';

interface WriteTypeguardExpressionOptions {
	indent: string;
	indentLevel: number;
	passErrorLogger?: boolean;

	/**
	 * By default, we assume we are checking a property on an object called `data`.
	 *
	 * If `isValue` is `true`, that means we are checking a property directly, without accessing it on `data`.
	 */
	isValue?: boolean;
}

/**
 * Write a typeguard expression for a single type, i.e. not an object with properties.
 */
export function writeTypeguardExpression(propName: string, propType: string, options: WriteTypeguardExpressionOptions): string {
	const {
		indent,
		indentLevel,
	} = options;
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
		return `typeof ${options.isValue ? '' : 'data.'}${propName} === '${propType}'`;
	}

	// `null` checks
	if (propType === 'null') {
		return `${options.isValue ? '' : 'data.'}${propName} === null`;
	}

	// Array types
	const arrayMatch = propType.match(arrayPattern);
	if (arrayMatch) {
		const innerType = arrayMatch[2] ?? arrayMatch[3];

		return `
${baseIndent}${indent}Array.isArray(${options.isValue ? '' : 'data.'}${propName}) &&
${baseIndent}${indent}${options.isValue ? '' : 'data.'}${propName}.every(${
	innerType.match(customTypePattern)
		? options.passErrorLogger
			? `(el) => ${writeTypeguardName(innerType)}(el, errorLogger)`
			: writeTypeguardName(innerType)
		: `(el) => ${writeTypeguardExpression('el', innerType, {
			indent,
			indentLevel: indentLevel + 1,
			isValue: true,
		})}`
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
		// If a union includes `any` or `unknown` there's no point in checking its other union members
		if (unionMembers.includes('any')) {
			return writeTypeguardExpression(propName, 'any', options);
		} else if (unionMembers.includes('unknown')) {
			return writeTypeguardExpression(propName, 'unknown', options);
		}

		return `
${baseIndent}${indent}${unionMembers.map((type) => writeTypeguardExpression(propName, type, {
	indent,
	indentLevel: indentLevel + 1,
})).join(` ||\n${baseIndent}${indent}`)}
${baseIndent}`;
	}

	// Date
	const isDate = propType === 'Date';
	if (isDate) {
		return `data.${propName} instanceof Date`;
	}

	// `any` and `unknown`
	const isUncheckable = propType === 'any' || propType === 'unknown';
	if (isUncheckable) {
		// No narrowing is needed for these types
		return 'true';
	}

	// Custom types
	const isCustomType = (customTypePattern).test(propType);
	if (isCustomType) {
		return `${writeTypeguardName(propType)}(data.${propName}${options.passErrorLogger ? ', errorLogger' : ''})`;
	}

	// Unrecognised pattern, left to developer to implement
	return `false /* TODO: implement typeguard for \`${propName}: ${propType}\`*/`;
}
