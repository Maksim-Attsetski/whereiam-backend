import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import router from "./src/router/index.js";
import errorMiddleware from "./src/middlewares/error-middleware.js";

dotenv.config();
mongoose.set("strictQuery", true);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.SITE_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`server start on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
