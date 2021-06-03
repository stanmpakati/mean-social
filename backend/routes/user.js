import express from "express";
import { getUsernames, getEmail, signup } from "./controllers/users.js";

const router = express.Router();

router.get("/usernames", getUsernames);

router.post("/email", getEmail);

router.post("/signup", signup);

export default router;
