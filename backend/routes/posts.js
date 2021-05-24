import express from "express";
import Post from "../models/post.js";

const router = express.Router();

router.post("/", (req, res) => {
  const post = new Post(req.body);

  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "201 message idiot, what else do you want from me?",
        postId: createdPost._id,
      });
      console.log(createdPost);
    })
    .catch((err) => console.log(err));
});

router.get("/", (req, res) => {
  Post.find()
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Post.deleteOne({ _id: id }).then((result) => {
    console.log(result), res.status(201).json({ message: "deleted" });
  });
});

export default router;