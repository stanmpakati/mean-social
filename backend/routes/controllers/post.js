import Post from "../../models/post.js";

export const addPost = (req, res) => {
  const post = new Post(req.body);

  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "201 message idiot, what else do you want from me?",
        postId: createdPost._id,
      });
    })
    .catch((err) => console.log(err));
};

export const getPosts = (req, res) => {
  Post.find()
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => console.log(err));
};

export const getPost = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (post) res.status(200).json(post);

    // else if no post
    res.status(404).json({ message: "post not found" });
  });
};

export const updatePost = (req, res) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(201).json({ message: "update successful" });
  });
};

export const deletePost = (req, res) => {
  const { id } = req.params;

  Post.deleteOne({ _id: id }).then((result) => {
    console.log(result), res.status(201).json({ message: "deleted" });
  });
};
