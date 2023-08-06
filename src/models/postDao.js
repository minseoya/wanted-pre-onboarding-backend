const { DatabaseError } = require("../utils/errors");
const appDataSource = require("./appDataSource");

const createPost = async ({ userId, title, content }) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts(user_id,title,content) VALUES(?,?,?)`,
      [userId, title, content]
    );
  } catch (err) {
    throw new DatabaseError();
  }
};

const getPostById = async (postId) => {
  try {
    return await appDataSource.query(`SELECT * FROM posts WHERE id =?`, [
      postId,
    ]);
  } catch (err) {
    throw new DatabaseError();
  }
};

const deletePostById = async ({ userId, postId }) => {
  try {
    return await appDataSource.query(
      ` DELETE FROM posts WHERE user_id = ? AND id = ?`,
      [userId, postId]
    );
  } catch (err) {
    throw new DatabaseError();
  }
};

const getPostList = async ({ skip, limit }) => {
  try {
    return await appDataSource.query(` SELECT * FROM posts LIMIT ? OFFSET ?`, [
      +limit,
      +skip,
    ]);
  } catch (err) {
    throw new DatabaseError();
  }
};

module.exports = { createPost, getPostById, deletePostById, getPostList };
