import axios from 'axios';
import { storage } from '../helpers/localStorage';
import { API_URL } from './constants';

export const $request = axios.create({
	baseURL: API_URL,
});

$request.interceptors.request.use((config: any) => {
	config.headers.Authorization = `Bearer ${storage.get('token')}`

	return config;
});

$request.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
			storage.remove("token");
        } catch (e) {
            console.log(e);
        }
    }
    throw error;
})
