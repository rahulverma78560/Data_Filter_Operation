import { del, post } from "httpie";
var CronJob = require("cron").CronJob;
export let autoPost = new CronJob(
  "*/4 * * * *",
  async function () {
    try {
      const { data } = await post(
        `http://localhost:${process.env.PORT || 3000}/rawCollection`
      );
      console.log(
        data,
        ".....................Cron JOB.................This will be called in every 1 min"
      );
    } catch (err) {
      console.error("Error!");
    }
  },
  null,
  true,
  "Asia/Kolkata"
);

export let autoDelete = new CronJob(
  "*/10 * * * *",
  async function () {
    try {
      const { data } = await del(
        `http://localhost:${process.env.PORT || 3000}/delete`
      );
      console.log(
        data,
        ".....................Cron JOB.................This will be called in every 1 min"
      );
    } catch (err) {
      console.error("Error!");
    }
  },
  null,
  true,
  "Asia/Kolkata"
);
