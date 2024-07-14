import {
	ActivityIndicator,
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Redirect, Stack, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { fetchPost } from "../utils/fetch-utils";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/auth-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const roles = ["ADMIN", "USER"];

export default function LoginScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState(roles[1]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const router = useRouter();
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const getSavedToken = async () => {
		const token = await AsyncStorage.getItem("token");
		const role = await AsyncStorage.getItem("role");
		if (token && role) {
			dispatch(setAuth({ token, role }));
		}
	};

	useEffect(() => {
		getSavedToken();
	}, []);

	useEffect(() => {
		if (auth.token && auth.role) {
			setIsLoggedIn(true);
		}
	}, [auth]);

	const handleLogin = async () => {
		setLoading(true);
		const result = await fetchPost(
			"login",
			JSON.stringify({ username, password, role })
		);
		setLoading(false);
		if (result.success) {
      await AsyncStorage.setItem("token", result.data.token);
      await AsyncStorage.setItem("role", role.toLowerCase());
			dispatch(
				setAuth({
					role: role.toLowerCase(),
					token: result.data.token,
					username,
				})
			);
		} else {
			setError(result.message);
		}
	};

	if (isLoggedIn) {
		return <Redirect href={`/${auth.role.toLowerCase()}`} />;
	}

	return (
		<>
			<Stack.Screen options={{ title: "Login", headerShown: true }} />
			<View style={styles.container}>
				<Picker
					onValueChange={(value) => setRole(value)}
					selectedValue={role}
					style={pickerSelectStyles}
				>
					{roles.map((role, index) => (
						<Picker.Item key={index} value={role} label={role} />
					))}
				</Picker>
				<TextInput
					style={styles.input}
					value={username}
					onChangeText={setUsername}
					placeholder="Enter username"
				/>
				<TextInput
					style={styles.input}
					value={password}
					onChangeText={setPassword}
					placeholder="Enter password"
					secureTextEntry
				/>

				{error && (
					<View style={{ alignItems: "center", marginBottom: 10 }}>
						<Text>{error}</Text>
					</View>
				)}

				<TouchableOpacity
					onPress={handleLogin}
					style={{
						width: "100%",
						alignItems: "center",
						backgroundColor: "#002865",
						paddingVertical: 10,
					}}
					disabled={loading}
				>
					{loading && <ActivityIndicator size="small" color="#fff" />}
					{!loading && (
						<Text
							style={{
								color: "#fff",
								fontWeight: "600",
								fontSize: 15,
							}}
						>
							Login
						</Text>
					)}
				</TouchableOpacity>
			</View>
		</>
	);
}

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	inputAndroid: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
});
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 10,
	},
	label: {
		marginBottom: 5,
	},
});
