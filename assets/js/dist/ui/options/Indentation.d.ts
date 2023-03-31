import { EnumTypeOf } from '../../util/EnumTypeOf.js';
export declare const Indentation: {
    readonly TABS: "\t";
    readonly SPACE_TWO: "  ";
    readonly SPACE_FOUR: "    ";
};
export type Indentation = EnumTypeOf<typeof Indentation>;
export declare const isIndentation: (value: unknown) => value is "\t" | "  " | "    ";
