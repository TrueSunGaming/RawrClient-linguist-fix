import { faviconUrl } from "./constants";

export function setFavicon(url: string): void {
	// Remove existing favicons
	const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
	existingFavicons.forEach(favicon => favicon.remove());
	const link = document.createElement('link');
	link.rel = 'icon';
	document.head.appendChild(link);
	link.href = url? url : faviconUrl;
}