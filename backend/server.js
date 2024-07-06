import express from "express";
import dotenv from "dotenv";

import postRoutes from "./routes/post.routes.js";
import connectToMongoDB from "./db/connectToMongo.js";

dotenv.config("");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`listening on port ${PORT}`);
});
