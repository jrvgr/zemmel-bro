import { navigate } from "svelte-navigator";
import Cookies from "js-cookie";
import axios from "axios";

export const api = axios.create({
  baseURL: `https://${localStorage.getItem("school")}.zportal.nl/api/v3`,
  timeout: 1000,
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    navigate("/login", { replace: true });
    console.log(error.response);
    return Promise.reject(error);
  }
);
