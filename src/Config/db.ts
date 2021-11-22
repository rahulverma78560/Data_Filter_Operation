import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://G7CR:G7CR@cluster0.l5qv2.mongodb.net/demo_db?retryWrites=true&w=majority" ||
        process.env.MONGO_URI
    );
    console.log(
      chalk.blueBright.bold(
        `MongoDB conncected!!!!!!!!!: ${conn.connection.host}`
      )
    );
  } catch (error) {
    handleError(error);
  }
};
function handleError(error: unknown) {
  throw new Error("An error occured while connecting to MongoDB");
}

export default connectDB;
