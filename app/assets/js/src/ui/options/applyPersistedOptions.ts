import { OptionsKey } from './OptionsKey.js';
import { setOptions } from './setOptions.js';
import { isTypeGuardianOptions } from './TypeGuardianOptions.js';

/**
 * If options have been persisted in `localStorage`, apply them to the UI.
 */
export function applyPersistedOptions(): void {
	const optionsJSON = localStorage.getItem(OptionsKey);
	if (!optionsJSON) {
		return;
	}

	try {
		const options = JSON.parse(optionsJSON) as unknown;
		if (!isTypeGuardianOptions(options)) {
		    return;
		}

		setOptions(options);
	} catch (e) {
		// Just give up silently
		return;
	}
}
