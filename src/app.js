import express from "express";
import cors from "cors";
import schoolRouter from "./routes/school.routes.js";

const app = express();

const origin = process.env.CORS_ORIGIN;

app.use(cors({ origin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

// Routes
app.use(schoolRouter);

export { app };
