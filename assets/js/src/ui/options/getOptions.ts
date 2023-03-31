import { Selector } from '../Selector.js';
import { isIndentation } from './Indentation.js';
import { TypeGuardianOptions } from './TypeGuardianOptions.js';

/**
 * Retrieve the options from the UI.
 */
export function getOptions($instance: Element): TypeGuardianOptions | null {
	const $indentation = $instance.querySelector(Selector.INDENTATION);
	if (!($indentation instanceof HTMLSelectElement)) {
		return null;
	}

	const indentation = $indentation.value;
	if (!(isIndentation(indentation))) {
		return null;
	}

	return {
		indentation,
	};
}
