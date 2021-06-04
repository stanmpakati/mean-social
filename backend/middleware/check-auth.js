import jwt from "jsonwebtoken";

export default (req, res, next) => {
  // checks the token in the header then continues
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({
        message: "Please make sure your request has an Authorization header",
      });
    }
    // recieves "Bearer token", so split to get token
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "long_random_word_for_encryption_9qid&&50*,d^0;(3a2");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Auth failed!", error: err });
  }
};
