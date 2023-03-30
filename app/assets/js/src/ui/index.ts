import { copy } from './copy.js';
import { CssClass } from './CssClass.js';
import { generate } from './generate.js';
import { Selector } from './Selector.js';

/**
 * Initialise the TypeGuardian UI.
 */
export function init(): void {
	initEvents();
}

function initEvents(): void {
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

	document.querySelectorAll<HTMLElement>(Selector.COPY).forEach((el) => el.addEventListener('click', copy));
}
