import Cookies from "js-cookie";
import { router } from "tinro";
import dayjs from "dayjs";
import { api } from "./api";

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
    .then((data): void => {
      if (data.request.status === 200) {
        Cookies.set("token", data.data.access_token, {
          expires: dayjs().add(1, "year").toDate(),
          SameSite: "Strict",
          Secure: true,
        });
        router.goto("/");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function logout(): void {
  api
    .post("/oauth/logout")
    .then(() => {
      router.goto("/login");
      Cookies.remove("token");
      localStorage.removeItem("school");
    })
    .catch((err) => {
      console.error(err);
    });
}
