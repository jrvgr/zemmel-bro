import Cookies from "js-cookie";
import { navigate } from "svelte-navigator";
import dayjs from "dayjs";
import { api } from "./lib";

export function updateToken(code: string, school: string): void {
  localStorage.setItem("school", school);

  api.defaults.baseURL = `https://${school}.zportal.nl/api/v3`;

  api
    .post("/oauth/token", null, {
      params: {
        grant_type: "authorization_code",
        code,
      },
    })
    .then((data) => {
      if (data.request.status === 200) {
        const token = data.data.access_token;
        Cookies.set("token", token, {
          expires: dayjs().add(1, "year").toDate(),
        });
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
