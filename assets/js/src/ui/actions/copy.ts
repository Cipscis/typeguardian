import { Selector } from '../Selector.js';
import { toast } from '../toast.js';

/**
 * Copy the current output from a TypeGuardian instance to the clipboard.
 */
export async function copy(this: HTMLElement): Promise<void> {
	const $button = this;
	const $instance = $button.closest(Selector.INSTANCE);
	if (!$instance) {
		return;
	}

	const $output = $instance.querySelector(Selector.OUTPUT);
	if (!($output instanceof HTMLTextAreaElement)) {
		return;
	}

	const output = $output.value;
	await navigator.clipboard.writeText(output);

	toast('Copied!');
}
