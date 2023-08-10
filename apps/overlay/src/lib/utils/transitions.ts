import { fly as _fly, type FlyParams } from 'svelte/transition';

export const fly = (node: HTMLElement, params?: FlyParams) => {
	if (node.parentElement) node.parentElement.style.width = `${node.clientWidth}px`;
	return _fly(node, params);
};

export const flyIn = { y: 16, delay: 500 };

export const flyOut = { y: -16 };
