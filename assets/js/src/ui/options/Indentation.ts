import { EnumTypeOf } from '../../util/EnumTypeOf.js';
import { isEnum } from '../../util/isEnum.js';

export const Indentation = {
	TABS: '\t',
	SPACE_TWO: '  ',
	SPACE_FOUR: '    ',
} as const;
export type Indentation = EnumTypeOf<typeof Indentation>;
export const isIndentation = isEnum(Indentation);
