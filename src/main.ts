import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import weekday from "dayjs/plugin/weekday";
import LocaleData from "dayjs/plugin/localeData";
import "./style.scss";
import App from "./App.svelte";

dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.extend(LocaleData);

dayjs.locale("en");

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
