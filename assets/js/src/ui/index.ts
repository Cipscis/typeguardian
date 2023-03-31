import { copy } from './actions/copy.js';
import { CssClass } from './CssClass.js';
import { generate } from './actions/generate.js';
import { persistOptions } from './options/persistOptions.js';
import { Selector } from './Selector.js';

/**
 * Initialise the TypeGuardian UI.
 */
export function init(): void {
	initEvents();
}

function initEvents(): void {
	// Generate
	document.querySelectorAll<HTMLElement>(Selector.GENERATE).forEach((el) => el.addEventListener('click', generate));
	document.addEventListener('keydown', (e) => {
		const $input = document.querySelector<HTMLElement>(Selector.INPUT);
		if (!$input) {
			return;
		}

		const $output = document.querySelector<HTMLElement>(Selector.OUTPUT);
		if (!$output) {
			return;
		}

		if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
			generate.call($input);
			if (!$output.classList.contains(CssClass.ERROR)) {
				copy.call($input);
			}
		}
	});

	// Copy
	document.querySelectorAll<HTMLElement>(Selector.COPY).forEach((el) => el.addEventListener('click', copy));

	// Persist options
	document.querySelectorAll<HTMLElement>(Selector.INDENTATION).forEach((el) => el.addEventListener('change', persistOptions));
}
