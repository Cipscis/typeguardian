/**
 * Write a certain level of defined indentation.
 */
export function writeIndentation(indent = '    ', level = 0): string {
	const indentLevels = new Array(level);
	indentLevels.fill(indent);

	return indentLevels.join('');
}
