/**
 * Read in a type definition, and convert it to a `TypeDef` that can be used in code.
 *
 * It assumes all type or interface definitions will meet these criteria:
 *
 * - The type's name is on the first line
 * - The following lines each describe one property each
 * - The last line is a closing brace and can be ignored
 */
export function readTypeDef(typedef) {
    const lineCommentPattern = /^\/\//;
    const blockCommentPattern = /^\/?\*/;
    const lines = typedef.split('\n')
        .map((line) => line.trim())
        .filter((line) => {
        const isEmpty = line === '';
        if (isEmpty) {
            return false;
        }
        const isLineComment = lineCommentPattern.test(line);
        if (isLineComment) {
            return false;
        }
        const isInBlockComment = blockCommentPattern.test(line);
        if (isInBlockComment) {
            return false;
        }
        return true;
    });
    if (lines.length === 0) {
        throw new Error(`Couldn't read empty type definition`);
    }
    const nameMatch = lines[0].match(/^(export\s+)?(type|interface)\s+(\w+)( extends (\w+))?\s*=?\s*{(\s*\/\/.*)?$/);
    if (!nameMatch) {
        throw new Error(`Couldn't determine name of custom type`);
    }
    const exported = Boolean(nameMatch[1]);
    const name = nameMatch[3];
    const extendedInterface = nameMatch[5];
    // Ignore first and last line
    const propLines = lines.slice(1, -1);
    const props = propLines.map((line, lineNumber) => {
        const isLineComment = (lineCommentPattern).test(line);
        if (isLineComment) {
            return;
        }
        // This is not a proper test, just assuming block comments will use JSDoc style
        const isInBlockComment = (blockCommentPattern).test(line);
        if (isInBlockComment) {
            return;
        }
        const lineMatch = line.match(/^(\w+)\s*(\??:)\s*(.+?)(,|;)?(\s*\/\/.*)?$/);
        if (!lineMatch) {
            throw new Error(`Couldn't read property on line ${lineNumber} of ${name} definition: ${line}`);
        }
        const propName = lineMatch[1];
        const isOptional = lineMatch[2] === '?:';
        const propType = `${lineMatch[3]}${isOptional ? ' | undefined' : ''}`;
        return [propName, propType];
    }).filter((el) => Boolean(el));
    const typeDef = {
        name,
        props,
        exported,
    };
    if (extendedInterface) {
        typeDef.extendedInterface = extendedInterface;
    }
    return typeDef;
}
//# sourceMappingURL=readTypeDef.js.map