import { Selector } from '../Selector.js';
import { getOptions } from './getOptions.js';
import { OptionsKey } from './OptionsKey.js';

/**
 * Store the current options in `localStorage`.
 */
export function persistOptions(this: Element): void {
	const $instance = this.closest(Selector.INSTANCE);
	if (!$instance) {
		return;
	}

	const options = getOptions($instance);

	localStorage.setItem(OptionsKey, JSON.stringify(options));
}
