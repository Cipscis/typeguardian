import { Selector } from '../Selector.js';
/**
 * Apply a given set of options to the UI.
 */
export function setOptions(options, $instance) {
    if (!$instance) {
        const $fetchedInstance = document.querySelector(Selector.INSTANCE);
        if (!$fetchedInstance) {
            throw new Error('Could not apply options: no UI found');
        }
        $instance = $fetchedInstance;
    }
    if ($instance instanceof Element) {
        $instance = [$instance];
    }
    for (const $el of $instance) {
        applyOptionsToInstance(options, $el);
    }
}
function applyOptionsToInstance(options, $instance) {
    const $allowEnhancedDebugging = $instance.querySelector(Selector.ALLOW_ENHANCED_DEBUGGING);
    if ($allowEnhancedDebugging instanceof HTMLInputElement) {
        $allowEnhancedDebugging.checked = options.allowEnhancedDebugging;
    }
    const $indentation = $instance.querySelector(Selector.INDENTATION);
    if ($indentation instanceof HTMLSelectElement) {
        $indentation.value = options.indentation;
    }
}
//# sourceMappingURL=setOptions.js.map