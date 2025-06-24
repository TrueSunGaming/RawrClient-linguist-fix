import { setFavicon } from "./util/setFavicon";
import { createProxy, reflectMethods} from "./util/interceptors";

export default class RawrClient {
	private survevObjects : Map<String, Object> = new Map();

	constructor() {
		globalThis.rawrClient = this;

		setFavicon();
	}

	displayObjects() : void {
		let rawr = this;
		createProxy(Function.prototype, "bind", {
			apply(target, thisArg, args) {
				try {
					if (args[0]?.nameInput != null && args[0]?.game != null) {
						Function.prototype.bind = target;
						rawr.survevObjects.set("game", args[0]);
					}
				} catch { }
				return (reflectMethods as any).apply(target, thisArg, args);
			}
		});
	}
}