import { copy } from './copy.js';
import { CssClass } from './CssClass.js';
import { generate } from './generate.js';
import { Selector } from './Selector.js';
/**
 * Initialise the TypeGuardian UI.
 */
export function init() {
    initEvents();
}
function initEvents() {
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
    document.querySelectorAll(Selector.COPY).forEach((el) => el.addEventListener('click', copy));
}
//# sourceMappingURL=index.js.map