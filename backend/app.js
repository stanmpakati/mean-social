import express from "express";
import postRoutes from "./routes/posts.js";

export const app = express();

app.get("/", (req, res) => res.send("Hello Weirdo"));

app.use("/api/posts", postRoutes);
