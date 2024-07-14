import { redirect } from 'react-router-dom';
import { fetchGet } from '../utils/fetch-utils';
export const loginLoader = async () => {
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role')?.toLowerCase();
	if (!token || !role) {
		return null;
	} else {
		return redirect('/' + role);
	}
};
export const verifyLoader = async () => {
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role')?.toLowerCase();
	if (!token || !role) {
		return redirect('/login');
	} else {
		const result = await fetchGet(role + '/verify');
		if (result.success) {
			localStorage.setItem('username', result.data.username);
			return null;
		} else {
			localStorage.clear();
			return redirect('/login');
		}
	}
};
