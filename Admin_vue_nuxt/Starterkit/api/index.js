import axios from "axios";

const baseURL = 'http://192.168.1.43/api';

export const defaultAxiosInstance = axios.create({baseURL: baseURL});

