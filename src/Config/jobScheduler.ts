import { get, post } from "httpie";
// var curl = require("curl");
var CronJob = require("cron").CronJob;
var job = new CronJob(
  "* * * * *",
  async function () {
    // get("https://example.com/404").catch((err) => {
    //   console.error(`(${err.statusCode}) ${err.message}`);
    //   console.error(err.headers["content-type"]);
    //   console.error(`~> ${err.data}`);
    // });
    // // curl.get("google.com", function (err: any, response: any, body: any) {});
    // console.log("You will see this message every 1 min");
    // console.log(curl);
    try {
      const { data } = await get("https://facebook.com");
      console.log(data, "/.........");
      // Demo: Endpoint will echo what we've sent
      const res = await post("https://jsonplaceholder.typicode.com/posts", {
        body: {
          id: data.id,
          name: data.name,
          number: data.order,
          moves: data.moves.slice(0, 6),
        },
      });
      console.log(res.statusCode); //=> 201
      console.log(res.data); //=> { id: 1, name: 'bulbasaur', number: 1, moves: [{...}, {...}] }
    } catch (err) {
      console.error("Error!");
      console.error("~> headers:");
      console.error("~> data:");
    }
  },
  null,
  true,
  "Asia/Kolkata"
);
export default job;

// const CronJob = require("cron").CronJob;

// console.log("Before job instantiation");
// const job = new CronJob("* 01 * * * *", function () {
//   const d = new Date();
//   console.log("At Ten Minutes:", d);
// });
// console.log("After job instantiation");
// export default job;
