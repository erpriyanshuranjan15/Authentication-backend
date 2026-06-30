import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js"
// import connectDB from "../src/db.js"

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://authentication-murex-eight.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use (morgan("dev"));
// connectDB()

app.use("/api/auth", authRouter);

export default app;
