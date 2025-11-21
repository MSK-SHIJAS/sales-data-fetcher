import express from "express";
import mongoose from "mongoose";
import salesRoutes from "./routes/salesRoutes.js";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/salesdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(express.json());


app.use("/api", salesRoutes);

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
