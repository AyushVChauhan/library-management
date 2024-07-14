import { useSelector } from "react-redux";
import { verify } from "../../utils/verify-utils";
import { Text, View } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function UserLayout() {
	const auth = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
	useEffect(() => {
		verify(auth, router)
			.then((result) => {
				setIsLoggedIn(true);
			})
			.catch(() => {
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
	if (!isLoggedIn) return <Redirect href="/" />;

	return <Stack screenOptions={{headerShown:false}}/>;
}
