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
