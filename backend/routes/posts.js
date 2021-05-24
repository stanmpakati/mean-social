import express from "express";
import Post from "../models/post.js";

const router = express.Router();

let posts = [];

router.post("/", (req, res) => {
  const post = new Post(req.body);
  posts.push(post);
  console.log(posts);

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "201 message idiot, what else do you want from me?",
        recieved: result,
      });
      console.log(result);
    })
    .catch((err) => console.log(err));
});

router.get("/", (req, res) => {
  Post.find()
    .then((documents) => {
      console.log(documents);
      res.status(200).json(documents);
    })
    .catch((err) => console.log(err));
});

export default router;
