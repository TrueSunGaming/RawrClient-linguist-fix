import { setFavicon } from "./util/setFavicon";
import { createProxy, reflectMethods } from "./util/interceptors";

export default class RawrClient {
	private _survevObjects: Map<String, Object> = new Map();

	constructor() {
		globalThis.rawrClient = this;

		setFavicon();
	}

	get survevObjects() {
		return this._survevObjects;
	}

	interceptObjects(): void {
		let rawr = this;
		createProxy(Function.prototype, "bind", {
			apply(target, thisArg, args) {
				try {
					if (args[0]?.nameInput != null && args[0]?.game != null) {
						Function.prototype.bind = target;
						rawr._survevObjects.set("game", args[0]);
					}
				} catch { }
				return (reflectMethods as any).apply(target, thisArg, args);
			}
		});
	}
}