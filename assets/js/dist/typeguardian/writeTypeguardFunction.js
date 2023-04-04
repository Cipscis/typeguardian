import { readTypeDef } from './readTypeDef.js';
import { writeTypeguardExpression } from './writeTypeguardExpression.js';
import { version } from './version.js';
import { writeTypeguardName } from './writeTypeguardName.js';
export function writeTypeguardFunction(typedefArg, indent = '    ') {
    const typedef = typeof typedefArg === 'string' ? readTypeDef(typedefArg) : typedefArg;
    const { name, props, exported, } = typedef;
    const typeguard = `/**
 * Typeguard function for {@linkcode ${name}}
 *
 * Generated with {@link https://cipscis.github.io/typeguardian TypeGuardian} v${version}
 */
${exported ? 'export ' : ''}function ${writeTypeguardName(name)}(testData: unknown): testData is ${name} {
${indent}const data = testData as ${name};

${indent}if (!(
${indent}${indent}typeof data === 'object' &&
${indent}${indent}data !== null
${indent})) {
${indent}${indent}return false;
${indent}}

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
//# sourceMappingURL=writeTypeguardFunction.js.map