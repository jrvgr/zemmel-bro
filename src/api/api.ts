/* eslint no-console: "off" */
import { router } from "tinro";
import Cookies from "js-cookie";
import axios from "axios";

export const api = axios.create({
  baseURL: `https://${localStorage.getItem("school")}.zportal.nl/api/v3`,
  timeout: 3000,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    // eslint-disable-next-line no-param-reassign
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    router.goto("/login");
    console.error(error.response);
    return Promise.reject(error);
  }
);
