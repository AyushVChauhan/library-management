import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: null,
	username: null,
	role: null,
};
const auth = createSlice({
	initialState,
	name: "Auth",
	reducers: {
		setAuth: (state, action) => {
			state.role = action.payload.role;
			state.username = action.payload.username;
			state.token = action.payload.token;
		},
		removeAuth: (state) => {
			state.role = null;
			state.username = null;
			state.token = null;
		},
	},
});

export const { setAuth, removeAuth } = auth.actions;
export default auth.reducer;
