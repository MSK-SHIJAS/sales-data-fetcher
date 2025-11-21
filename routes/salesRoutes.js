import express from "express";
import { fetchAndSaveSales } from "../controller/salescontroller.js";

const router = express.Router();

router.get("/fetch-sales", fetchAndSaveSales);

export default router;
