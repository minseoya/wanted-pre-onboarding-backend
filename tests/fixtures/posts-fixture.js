const appDataSource = require("../../src/models/appDataSource");

const createPost = async (posts) => {
  let data = [];

  for (const post of posts) {
    data.push([post.userId, post.title, post.content]);
  }

  return await appDataSource.query(
    `
    INSERT INTO posts (
      user_id,title,content) 
    VALUES ?
    `,
    [data]
  );
};

module.exports = {
  createPost,
};
