import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).select("-__v").select("-_id");
    if (!posts) {
      return res.status(200).json([]);
    }
    res.status(200).json(posts);
  } catch (err) {
    console.log("error in getposts contrll: ", err.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

export const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findOne({ title });
    if (post) {
      return res.status(400).json({
        status: "failed",
        error: "A post with the same title already exists",
      });
    }

    const newPost = new Post({
      title,
      content,
    });

    if (newPost) {
      await newPost.save();

      res.status(200).json({
        title: newPost.title,
        content: newPost.content,
      });
    } else {
      res.status(400).json({
        status: "failed",
        error: "invalid post data",
      });
    }
  } catch (err) {
    console.log("error in add post controller: ", err.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { title } = req.params;
    await Post.findOneAndDelete({ title });
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log("error in del contoller ", err.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};
