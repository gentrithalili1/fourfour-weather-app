import type { AxiosRequestConfig } from "axios";

import { axiosClient } from "@/core/api/axios-client";

const getApi = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
	const response = await axiosClient.get<T>(url, config);
	return response.data;
};

const postApi = async <T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> => {
	const response = await axiosClient.post<T>(url, data, config);
	return response.data;
};

const deleteApi = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
	const response = await axiosClient.delete<T>(url, config);
	return response.data;
};

const putApi = async <T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> => {
	const response = await axiosClient.put<T>(url, data, config);
	return response.data;
};

export const apiRequest = {
	get: getApi,
	post: postApi,
	delete: deleteApi,
	put: putApi,
};
