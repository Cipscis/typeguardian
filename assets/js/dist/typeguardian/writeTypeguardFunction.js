import { readTypeDef } from './readTypeDef.js';
import { writeTypeguardExpression } from './writeTypeguardExpression.js';
import { version } from './version.js';
export function writeTypeguardFunction(typedefArg, indent = '    ') {
    const typedef = typeof typedefArg === 'string' ? readTypeDef(typedefArg) : typedefArg;
    const { name, props, } = typedef;
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
//# sourceMappingURL=writeTypeguardFunction.js.map