import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import user from "../../models/user.js";
import User from "../../models/user.js";

export const getUsernames = (req, res) => {
  // Returns a list of all the usernames
  User.find().then((users) => {
    res.status(200).json({ usernames: users.map((user) => user.username) });
  });
};

export const getEmail = (req, res) => {
  // to check if an email is in the db or not
  // takes in email

  User.find({ email: req.body.email.toLower() }).then((email) => {
    if (email.length !== 0) res.status(200).json({ message: "Found" });
    else res.json({ message: "Not found" });
  });
};

export const signup = (req, res) => {
  // For signing up new users
  // Recieves username, email and password

  // Encrypypts the password
  bcrypt.hash(req.body.password, 10).then((hash) => {
    // Create a new user with the information provided
    // and hashed password
    const user = new User({
      username: req.body.username.toLower(),
      email: req.body.email.toLower(),
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
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
};

export const login = (req, res) => {
  // To login already existing users
  // Takes in either username or email and password
  user
    .findOne({
      $or: [
        { username: req.body.username.toLower() },
        { email: req.body.email.toLower() },
      ],
    })
    .then((user) => {
      // if user is not found
      if (!user) return res.status(404).json({ message: "user not found" });

      // if user found
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      // If passwords don't match
      if (!result) return res.status(401).json({ message: "Invalid Password" });

      // If passwords match
      // Create jwt token
      const token = jwt.sign(
        {
          email: user.email,
          username: user.name,
          userId: user._id,
        },
        "long_random_word_for_encryption_9qid&&50*,d^0;(3a2",
        { expiresIn: "1h" }
      );

      // Send response
      res.status(200).json({ message: "logged in successefuly", token: token });
    })
    .catch((err) => {
      console.log(err), res.status(500).json({ message: err });
    });
};
