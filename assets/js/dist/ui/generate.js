import { writeTypeguardFunction } from '../typeguardian/writeTypeguardFunction.js';
import { CssClass } from './CssClass.js';
import { Selector } from './Selector.js';
/**
 * Generate a typeguard function from input in the UI, and display it.
 */
export function generate() {
    const $button = this;
    const $instance = $button.closest(Selector.INSTANCE);
    if (!$instance) {
        return;
    }
    const $input = $instance.querySelector(Selector.INPUT);
    if (!($input instanceof HTMLTextAreaElement)) {
        return;
    }
    const $output = $instance.querySelector(Selector.OUTPUT);
    if (!($output instanceof HTMLTextAreaElement)) {
        return;
    }
    const input = $input.value;
    try {
        const output = writeTypeguardFunction(input);
        $output.value = output;
        $output.classList.remove(CssClass.ERROR);
    }
    catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        $output.value = message;
        $output.classList.add(CssClass.ERROR);
    }
}
//# sourceMappingURL=generate.js.map