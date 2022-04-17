import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import weekday from "dayjs/plugin/weekday";
import LocaleData from "dayjs/plugin/localeData";
import "./style.scss";
import { get } from "svelte/store";
import App from "./App.svelte";
import { api, getStudents, studentSchedule, studentSchoolYears } from "@/api";
import { getStudentName } from "./components/userName";
import { currentWeek, week } from "./stores";

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

console.log(get(currentWeek).weekday(1).format("dddd"));

// api
//   .get("/liveschedule", {
//     params: {
//       student: "120012804",
//       week: "202114",
//     },
//   })
//   .then((data) => {
//     console.log(data);
//   });

// studentSchoolYears("~me").then((year) => {
//   getStudents(year.data.response.data[0].schoolInSchoolYears[0]).then(
//     (students) => {
//       console.log(
//         students.data.response.data.forEach((element) => {
//           console.log({
//             firstname: element.firstName,
//             prefix: element.prefix,
//             lastname: element.lastName,
//             code: element.code,
//           });
//         })
//       );
//     }
//   );
// });

// getStudents("1201").then((students) => {
//   console.log(students.data.response.data);
// });
