import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://G7CR:G7CR@cluster0.l5qv2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
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
  throw new Error(
    "Oppppps!!!!!!!!!!!...An error occured while connecting to MongoDB"
  );
}

export default connectDB;
