import { del, post } from "httpie";
var CronJob = require("cron").CronJob;
export let autoPost = new CronJob(
  "*/4 * * * *",
  async function () {
    try {
      const { data } = await post(
        `http://localhost:${process.env.PORT || 3000}/rawCollection`
      );
      // console.log(
      //   data,
      //   ".....................Cron JOB..................."
      // );
    } catch (err) {
      console.error("..........No Data Found.........");
    }
  },
  null,
  true,
  "Asia/Kolkata"
);

export let autoDelete = new CronJob(
  "*/2 * * * *",
  async function () {
    try {
      const { data } = await del(
        `http://localhost:${process.env.PORT || 3000}/deleteData`
      );
      console.log(data, ".................Cron JOB.................");
    } catch (err) {
      console.error("..........No Data Found.........");
    }
  },
  null,
  true,
  "Asia/Kolkata"
);
