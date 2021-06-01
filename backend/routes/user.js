import express from "express";
import { signup } from "./controllers/users";

const router = express.Router();

router.post("/", signup);

export default router;
