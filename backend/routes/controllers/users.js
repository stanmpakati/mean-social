import bcrypt from "bcrypt";
import User from "../../models/user.js";

export const getUsernames = (req, res) => {
  User.find().then((users) => {
    res.status(200).json({ usernames: users.map((user) => user.username) });
  });
};

export const getEmail = (req, res) => {
  User.find({ email: req.body.email }).then((email) => {
    if (email.length !== 0) res.status(200).json({ message: "Found" });
    else res.json({ message: "Not found" });
  });
};

export const signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User Created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
};
