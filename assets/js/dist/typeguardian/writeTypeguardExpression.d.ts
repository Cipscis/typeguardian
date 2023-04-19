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
export declare function writeTypeguardExpression(propName: string, propType: string, options: WriteTypeguardExpressionOptions): string;
export {};
