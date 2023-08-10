const appDataSource = require("../../src/models/appDataSource");

const createUsers = async (userList) => {
  let data = [];

  for (let user of userList) {
    data.push([user.email, user.password]);
  }

  return await appDataSource.query(
    `
    INSERT INTO users (
      email,password) 
    VALUES ?
    `,
    [data]
  );
};

module.exports = {
  createUsers,
};
