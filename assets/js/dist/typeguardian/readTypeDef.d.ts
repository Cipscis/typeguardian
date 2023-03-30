import { TypeDef } from './TypeDef.js';
/**
 * Read in a type definition, and convert it to a `TypeDef` that can be used in code.
 *
 * It assumes all type or interface definitions will meet these criteria:
 *
 * - The type's name is on the first line
 * - The following lines each describe one property each
 * - The last line is a closing brace and can be ignored
 */
export declare function readTypeDef(typedef: string): TypeDef;
