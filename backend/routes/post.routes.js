import express from "express";
import {
  getPosts,
  addPost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:title", deletePost);

export default router;
