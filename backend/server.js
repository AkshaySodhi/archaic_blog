import express from "express";
import dotenv from "dotenv";
import path from "path";

import postRoutes from "./routes/post.routes.js";
import connectToMongoDB from "./db/connectToMongo.js";

dotenv.config("");
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.use("/api/posts", postRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`listening on port ${PORT}`);
});
