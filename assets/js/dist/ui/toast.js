import { CssClass } from './CssClass.js';
const defaults = {
    duration: 6000,
};
const $toastContainer = document.createElement('div');
$toastContainer.classList.add(CssClass.TOAST_CONTAINER);
$toastContainer.setAttribute('aria-live', 'polite');
document.body.append($toastContainer);
export function toast(message, opts) {
    const options = {
        ...defaults,
        ...opts,
    };
    const $toast = createToast();
    $toast.innerText = message;
    const keyFrom = {
        opacity: 0,
    };
    if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        keyFrom.transform = 'translateY(100%)';
    }
    $toastContainer.append($toast);
    $toast.animate([keyFrom, {}], {
        duration: 300,
        fill: 'backwards',
    });
    queueDestroyToast($toast, options.duration);
}
function createToast() {
    const $toast = document.createElement('div');
    $toast.classList.add(CssClass.TOAST);
    return $toast;
}
function queueDestroyToast($toast, duration) {
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            const keyTo = {
                opacity: 0,
            };
            if (matchMedia('(prefers-reduced-motion: reduce)').matches === false) {
                keyTo.transform = 'translateY(-100%)';
            }
            const animation = $toast.animate([{}, keyTo], {
                duration: 300,
                fill: 'forwards',
            });
            animation.addEventListener('finish', () => {
                $toast.remove();
                resolve();
            });
            // TODO: Handle what happens if animations are prevented
        }, duration);
    });
}
//# sourceMappingURL=toast.js.map