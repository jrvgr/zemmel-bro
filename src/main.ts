import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import { getTeachers } from "@api";
import "./style.scss";
import App from "./App.svelte";

dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  weekdays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
});

const app = new App({
  target: document.getElementById("app"),
});

export default app;

export function Darkmode(storage: Storage): void {
  const { classList } = document.body;
  classList.toggle("dark");
  storage.setItem("dark", classList.contains("dark").toString());
}

function restorescheme() {
  const storage = localStorage;
  const dark = storage.getItem("dark");
  if (dark === "true") {
    Darkmode(storage);
  }
}

restorescheme();

getTeachers("1201").then((data) => console.log(data));

// studentSchoolYears("~me").then((data) => {
//   console.log(data.data.response.data[0]);
// });

// getTeachers(year).then((data) => {
//    console.log(data.data.response.data);
//  });
