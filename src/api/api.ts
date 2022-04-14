import { router } from "tinro";
import Cookies from "js-cookie";
import axios from "axios";

export const api = axios.create({
  baseURL: `https://${localStorage.getItem("school")}.zportal.nl/api/v3`,
  timeout: 3000,
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

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
