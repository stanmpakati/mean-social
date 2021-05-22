import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const posts = [
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
  res.status(200).json(posts);
});

export default router;
