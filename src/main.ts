import App from "./App.svelte";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import axios from "axios";
import weekYear from "dayjs/plugin/weekYear"; // dependent on weekOfYear plugin
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import { navigate } from "svelte-navigator";
dayjs.extend(weekYear);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

const app = new App({
	target: document.getElementById("app"),
});

export default app;

console.log(dayjs().isoWeek());

export let token = "";

export let authenticated = false;

const auth = "Bearer" + token;

const school = "2college";

Cookies.set("token", auth, { Secure: true }, { sameSite: "strict" });

const api = axios.create({
	baseURL: `https://${school}.zportal.nl/api/v3`,
	timeout: 1000,
	headers: { Authorization: Cookies.get("token") },
});

api.interceptors.response.use(
	function (response) {
		authenticated = true;
		return response;
	},
	function (error) {
		if (error.response.status === 401) {
			authenticated = false;
			navigate("/login", { replace: true });
			console.log("lol");
		}
		return Promise.reject(error);
	}
);

const queryweek = dayjs().year().toString() + dayjs().isoWeek().toString();

api
	.get("/liveschedule", {
		params: { student: "~me", week: queryweek },
	})
	.then((data) => console.log(data.data.response.data[0]));

console.log(dayjs().year().toString() + dayjs().isoWeek().toString());
