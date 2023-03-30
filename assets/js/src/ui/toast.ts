import { Selector } from './Selector.js';

export function toast(message: string): void {
	const $toast = document.querySelector<HTMLElement>(Selector.TOAST);
	if (!$toast) {
		return;
	}

	$toast.innerHTML = message;
	$toast.hidden = false;

	const keyframes: Keyframe[] = [
		{
			opacity: '0',
		},
		{
			opacity: '1',
			offset: 0.2,
		},
		{
			opacity: '1',
			offset: 0.8,
		},
		{
			opacity: '0',
		},
	];

	const animation = $toast.animate(keyframes, 5000);

	animation.addEventListener('finish', (e) => {
		$toast.hidden = true;
		$toast.innerHTML = '';
	});
}
