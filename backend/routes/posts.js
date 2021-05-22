import express from "express";

const router = express.Router();

let posts = [
  {
    id: "iijo89s090s",
    title: "Server side post",
    content: "This post comes from the backend i.e node js",
  },
  {
    id: "uuir4938",
    title: "Second Server side post",
    content: "Hanzi just one post is boring",
  },
];

router.post("/", (req, res) => {
  const post = req.body;
  posts.push(post);
  console.log(posts);
  res.status(201).json({
    message: "201 message idiot, what else do you want from me?",
    recieved: post,
  });
});

router.get("/", (req, res) => {
  res.status(200).json(posts);
});

export default router;
