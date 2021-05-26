import express from "express";

import {
  addPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "./controllers/post.js";

const router = express.Router();

router.post("/", addPost);

router.get("/", getPosts);

router.get("/:id", getPost);

router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
