import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
    maxLength: 200,
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
