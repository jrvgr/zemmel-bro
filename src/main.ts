import App from "./App.svelte";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import axios from "axios";
import weekYear from "dayjs/plugin/weekYear"; // dependent on weekOfYear plugin
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import { navigate } from "svelte-navigator";
import { writable } from "svelte/store";
dayjs.extend(weekYear);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

const app = new App({
	target: document.getElementById("app"),
});

export default app;

console.log(dayjs().isoWeek());

export const code = writable("");

export let authenticated = false;

const api = axios.create({
	baseURL: `https://${localStorage.getItem("school")}.zportal.nl/api/v3`,
	timeout: 1000,
	headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

export function updateToken(code, school) {
	localStorage.setItem("school", school);

	api.defaults.baseURL = `https://${school}.zportal.nl/api/v3`;

	api
		.post("/oauth/token", null, {
			params: {
				grant_type: "authorization_code",
				code: code,
			},
		})
		.then((data) => {
			if (data.request.status === 200) {
				const token = data.data.access_token;
				Cookies.set("token", token, { expires: dayjs().add(1, "year").toDate() });
				navigate("/");
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

function shakeLoginItems(){
	const loginItems = document.querySelectorAll(".button");
}

api.interceptors.response.use(
	function (response) {
		authenticated = true;
		return response;
	},
	function (error) {
		if (error.response.status === 401) {
			navigate("/login", { replace: true });
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
