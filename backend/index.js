import mongoose from "mongoose";
import { app } from "./app.js";

const port = process.env.PORT || "5000";
app.set("port", port);

mongoose
  .connect(
    "mongodb+srv://stan:veuJLztIPiA9LDRB@cluster0.5icjs.mongodb.net/mean-social?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => console.log(`Running on http://localhost:${port}`));
  })
  .catch((e) => console.log(`Error connecting to the database: ${e.message}`));

// Mongo password
// stan - veuJLztIPiA9LDRB
