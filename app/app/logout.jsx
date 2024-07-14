import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeAuth } from "../store/auth-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogoutScreen() {
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			await AsyncStorage.clear();
		})();
		dispatch(removeAuth());
	}, []);

	return <Redirect href="/" />;
}
