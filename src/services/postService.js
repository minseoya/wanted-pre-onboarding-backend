const postDao = require("../models/postDao");
const { BaseError } = require("../utils/errors");
const { Pagination } = require("../utils/enum");

const createPost = async ({ userId, title, content }) => {
  return await postDao.createPost({ userId, title, content });
};

const deletePostById = async ({ userId, postId }) => {
  return await postDao.deletePostById({ userId, postId });
};

const getPostById = async (postId) => {
  return await postDao.getPostById(postId);
};

const getPostList = async ({
  offset = Pagination.Offset,
  limit = Pagination.Limit,
}) => {
  return await postDao.getPostList({ offset, limit });
};
module.exports = { getPostList, createPost, deletePostById, getPostById };
