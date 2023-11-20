import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/connect";
import fileUpload from "express-fileupload";
import rateLimiter from "express-rate-limit";
// import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();
const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());
app.use(fileUpload());

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(<string>process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`server is listening on port ${port}...`)
    );
  } catch (error: any) {
    console.log(error);
  }
};

start();
