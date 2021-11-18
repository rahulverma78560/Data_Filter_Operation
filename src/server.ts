import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 300;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
