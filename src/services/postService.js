const postDao = require("../models/postDao");
const { BaseError } = require("../utils/errors");
const { Pagination } = require("../utils/enum");

const createPost = async ({ userId, title, content }) => {
  const post = await postDao.createPost({ userId, title, content });

  return await postDao.getPostById(post.insertId);
};

const deletePostById = async ({ userId, postId }) => {
  const [post] = await postDao.getPostById(postId);

  if (post.user_id != userId) {
    throw new BaseError("UnauthorizedException", 401);
  }

  return await postDao.deletePostById({ userId, postId });
};

const getPostById = async (postId) => {
  return await postDao.getPostById(postId);
};

const getPostList = async (offset) => {
  const skip = offset ? (offset - 1) * Pagination.Limit : 0;

  const limit = Pagination.Limit;

  return await postDao.getPostList({ skip, limit });
};

const updatePost = async ({ postId, userId, title, content }) => {
  const [post] = await postDao.getPostById(postId);

  if (post.user_id != userId) {
    throw new BaseError("UnauthorizedException", 401);
  }

  await postDao.updatePost({ postId, userId, title, content });

  return await postDao.getPostById(postId);
};

module.exports = {
  getPostList,
  createPost,
  deletePostById,
  getPostById,
  updatePost,
};
