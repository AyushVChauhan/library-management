import { useDispatch, useSelector } from "react-redux";
import { verify } from "../../utils/verify-utils";
import { Text, View } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { removeAuth } from "../../store/auth-slice";

export default function AdminLayout() {
	const auth = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
	useEffect(() => {
		verify(auth, router)
			.then((result) => {
				setIsLoggedIn(true);
			})
			.catch((error) => {
                dispatch(removeAuth());
				setIsLoggedIn(false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [auth]);

	if (loading)
		return (
			<View>
				<Text>Loading</Text>
			</View>
		);
	// if (!isLoggedIn) return <Redirect href="/" />;

	return <Stack screenOptions={{headerShown:false}}/>;
}
