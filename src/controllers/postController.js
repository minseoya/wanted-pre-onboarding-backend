const postService = require("../services/postService");
const { catchError } = require("../utils/errors");

const createPost = catchError(async (req, res) => {
  const userId = req.user.id;
  const { title, content } = req.body;

  if (!title || !content) {
    throw new BaseError("KEY_ERROR", 400);
  }

  const post = await postService.createPost({ userId, title, content });
  return res.status(201).json({ message: "SIGNUP_SUCCESS", post });
});

const deletePost = catchError(async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  const post = await postService.deletePostById({ userId, postId });
  return res.status(204).json({ message: "SUCCESS", post });
});

const getPostById = catchError(async (req, res) => {
  const { postId } = req.params;

  const post = await postService.getPostById(postId);
  return res.status(200).json({ post });
});

const getPostList = catchError(async (req, res) => {
  const { offset, limit } = req.params;
  const post = await postService.getPostList(offset, limit);
  return res.status(200).json({ post });
});

module.exports = { createPost, deletePost, getPostById, getPostList };