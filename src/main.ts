import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import App from "./App.svelte";
import { studentSchedule, studentSchoolYears } from "./lib/api";
import "./style.scss";

dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);

const app = new App({
  target: document.getElementById("app"),
});

export default app;

studentSchedule("~me", dayjs().format("YYYYWW").toString()).then((data) => {
  console.log(data.data.response.data[0]);
});

studentSchoolYears("~me").then((data) => {
  console.log(data.data.response.data[0]);
});

// getTeachers(year).then((data) => {
//   console.log(data.data.response.data);
// });
