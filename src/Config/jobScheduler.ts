import { addData } from "../Manager/rawDataManager";
import { removeData } from "../Manager/deleteManager";

var CronJob = require("cron").CronJob;
export let autoPost = new CronJob(
  "*/08 * * * *",
  async function () {
    const postJob = addData();
    console.log(`Post API is runnung in  Every 8 min ${postJob}`);
  },
  null,
  true,
  "Asia/Kolkata"
);

export let autoDelete = new CronJob(
  "*/10 * * * *",
  async function () {
    const deleteJob = removeData();
    console.log(`Delete API is runnig in  every 10 min`);
  },
  null,
  true,
  "Asia/Kolkata"
);
