import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: 'abc',
};

const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export const { setToken } = auth.actions;
export default auth.reducer;
