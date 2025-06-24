const ObjectPropertiesProxy = propertiesProxier(Object);

const ReflectPropertiesProxy = propertiesProxier(Reflect);

const ProxyMap = new Map();

function propertiesProxier<T extends Object>(targetObject: T): Object {
	const result = {};
	for (let prop of Object.getOwnPropertyNames(targetObject)) {
		(result as any)[prop] = targetObject[prop as keyof typeof targetObject];
	}
	return result;
}

function createProxy(target: any, property: any, handler: ProxyHandler<any>) {
	const proxy = new Proxy(target[property], handler);
	ProxyMap.set(proxy, target[property]);
	target[property] = proxy;
}

export {
	createProxy,
	ReflectPropertiesProxy as reflectMethods,
	ObjectPropertiesProxy as objectMethods,
	ProxyMap as proxyTable
};

