import { app } from "./app.js";

const port = process.env.PORT || "5000";
app.set("port", port);

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
