export const BASE_WORKER_URL = "/api/weather";

import axios, { type AxiosInstance } from "axios";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_WORKER_URL,
  headers: { "Content-Type": "application/json" },
});
