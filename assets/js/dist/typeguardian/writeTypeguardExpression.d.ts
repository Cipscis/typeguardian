interface WriteTypeguardExpressionOptions {
    indent: string;
    indentLevel: number;
    passErrorLogger?: boolean;
}
/**
 * Write a typeguard expression for a single type, i.e. not an object with properties.
 */
export declare function writeTypeguardExpression(propName: string, propType: string, options: WriteTypeguardExpressionOptions): string;
export {};
