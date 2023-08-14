const postService = require("../services/postService");
const { catchError } = require("../utils/errors");
const { Pagination } = require("../utils/enum");

const createPost = catchError(async (req, res) => {
  const userId = req.user.id;
  const { title, content } = req.body;

  if (!title || !content) {
    throw new BaseError("KEY_ERROR", 400);
  }

  const post = await postService.createPost({ userId, title, content });
  return res.status(201).json(post);
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
  return res.status(200).json(post);
});

const getPostList = catchError(async (req, res) => {
  const { offset = Pagination.Offset } = req.query;

  const post = await postService.getPostList(offset);

  return res.status(200).json(post);
});

const updatePost = catchError(async (req, res) => {
  const userId = req.user.id;
  const { postId, title, content } = req.body;

  const post = await postService.updatePost({ postId, userId, title, content });
  return res.status(201).json(post);
});

module.exports = {
  createPost,
  deletePost,
  getPostById,
  getPostList,
  updatePost,
};
