import RawrClient from "./RawrClient";

if (window.location.pathname === "/") {
	const rawrClient = new RawrClient();
	rawrClient.interceptObjects();
	const interceptedObjs = rawrClient.survevObjects;
	console.log(interceptedObjs);
}