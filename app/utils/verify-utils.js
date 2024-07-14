import { Linking } from "react-native";
import { fetchGet } from "./fetch-utils";

async function verify({ token, role }, router) {
	if (!token || !role) {
		throw new Error();
	} else {
		const result = await fetchGet(role + "/verify", { token }, router);
		if (result.success) {
			return result.data;
		} else {
			throw new Error("ERROR");
		}
	}
}

export { verify };
