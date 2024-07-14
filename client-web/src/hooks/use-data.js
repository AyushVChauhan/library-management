import { useCallback, useState } from 'react';
import { fetchGet, fetchPost } from '../utils/fetch-utils';

/**
 *
 * @param {null | []} initialState data state initially can be (`[]`, `null`)
 * @param {{url: string, method: string, body: any}} request backend request
 * @param {(ele: any) => any} mapFn to map the data
 * @returns `getData`, `data`, `loading`, `error`
 */
const useData = (initialState = null, { url, method = 'GET', body }, mapFn = (ele) => ele) => {
	const [data, setData] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const getData = useCallback(async () => {
		setLoading(true);
		setError('');
		let result = null;
		if (method == 'POST') {
			result = await fetchPost(url, JSON.stringify(body));
		} else {
			result = await fetchGet(url);
		}

		if (result.success) {
			let resultData = result.data;
			if (Array.isArray(resultData)) {
				setData(resultData.map(mapFn));
			} else {
				setData(resultData);
			}
		} else {
			setError(result.message);
		}
		setLoading(false);
	}, [body, mapFn, method, url]);
	return [getData, data, loading, error];
};
export default useData;
