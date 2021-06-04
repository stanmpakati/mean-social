import jwt from "jsonwebtoken";

export default (req, res, next) => {
  // checks the token in the header then continues
  try {
    // recieves "Bearer token", so split to get token
    const token = req.headers.authorisation.split(" ")[1];
    jwt.verify(token, "long_random_word_for_encryption_9qid&&50*,d^0;(3a2");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Auth failed!", error: err });
  }
};
