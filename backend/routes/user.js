import express from "express";
import { signup } from "./controllers/users.js";

const router = express.Router();

router.post("/", signup);

export default router;
