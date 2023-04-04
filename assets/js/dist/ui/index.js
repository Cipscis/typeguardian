import { copy } from './actions/copy.js';
import { CssClass } from './CssClass.js';
import { generate } from './actions/generate.js';
import { persistOptions } from './options/persistOptions.js';
import { Selector } from './Selector.js';
/**
 * Initialise the TypeGuardian UI.
 */
export function init() {
    initEvents();
}
function initEvents() {
    // Generate
    document.querySelectorAll(Selector.GENERATE).forEach((el) => el.addEventListener('click', generate));
    document.addEventListener('keydown', (e) => {
        const $input = document.querySelector(Selector.INPUT);
        if (!$input) {
            return;
        }
        const $output = document.querySelector(Selector.OUTPUT);
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
    document.querySelectorAll(Selector.COPY).forEach((el) => el.addEventListener('click', copy));
    // Persist options
    document.querySelectorAll(Selector.ALLOW_ENHANCED_DEBUGGING).forEach((el) => el.addEventListener('change', persistOptions));
    document.querySelectorAll(Selector.INDENTATION).forEach((el) => el.addEventListener('change', persistOptions));
}
//# sourceMappingURL=index.js.map