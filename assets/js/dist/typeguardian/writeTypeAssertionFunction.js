import { readTypeDef } from './readTypeDef.js';
import { writeTypeguardExpression } from './writeTypeguardExpression.js';
import { version } from './version.js';
import { writeTypeAssertionName } from './writeTypeAssertionName.js';
import { writeTypeguardName } from './writeTypeguardName.js';
export function writeTypeAssertionFunction(typedefArg, indent = '    ') {
    const typedef = typeof typedefArg === 'string' ? readTypeDef(typedefArg) : typedefArg;
    const { name, extendedInterface, props, exported, } = typedef;
    const typeAssertion = `/**
 * Type assertion function for {@linkcode ${name}}
 *
 * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v${version}
 *
 * @param [errorLogger] A function that can log errors specifying exactly where nested typeguards failed
 */
function ${writeTypeAssertionName(name)}(testData: unknown, errorLogger?: (message: string) => void): asserts testData is ${name} {
${indent}const data = testData as ${name};

${extendedInterface
        ? `${indent}if (!(${writeTypeguardName(extendedInterface)}(data))) {
${indent}${indent}throw new TypeError('Tested value was not of type \`${extendedInterface}\`');
${indent}}`
        : `${indent}if (!(
${indent}${indent}typeof data === 'object' &&
${indent}${indent}data !== null
${indent})) {
${indent}${indent}throw new TypeError('Tested value was not an object');
${indent}}`}

${indent}${props.map(([propName, propType]) => `if (!(${writeTypeguardExpression(propName, propType, {
        indent,
        indentLevel: 1,
        passErrorLogger: true,
    })})) {
${indent}${indent}throw new TypeError('\`${name}\` typeguard failed: Property \`${propName}\` was not of type \`${propType}\`');
${indent}}`).join(`\n\n${indent}`)}
}
`;
    const typeguard = `/**
 * Typeguard function for {@linkcode ${name}}
 *
 * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v${version}
 *
 * @param [errorLogger] A function that can log errors specifying exactly where the typeguard failed
 */
${exported ? 'export ' : ''}function ${writeTypeguardName(name)}(testData: unknown, errorLogger?: (message: string) => void): testData is ${name} {
${indent}try {
${indent}${indent}${writeTypeAssertionName(name)}(testData, errorLogger);
${indent}${indent}return true;
${indent}} catch (e) {
${indent}${indent}if (errorLogger) {
${indent}${indent}${indent}errorLogger(e instanceof Error ? e.message : String(e));
${indent}${indent}}
${indent}${indent}return false;
${indent}}
}
`;
    return `${typeAssertion}\n${typeguard}`;
}
//# sourceMappingURL=writeTypeAssertionFunction.js.map