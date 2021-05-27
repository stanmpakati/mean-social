import express from "express";
import multer from "multer";

import {
  addPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  storage,
} from "./controllers/post.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", multer({ storage: storage }).single("image"), addPost);

router.patch("/:id", multer({ storage: storage }).single("image"), updatePost);

router.delete("/:id", deletePost);

export default router;
