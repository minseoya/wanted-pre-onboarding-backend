const appDataSource = require("../../src/models/appDataSource");
const bcrypt = require("bcrypt");

const createUsers = async (userList) => {
  let data = [];
  const saltRounds = 12;

  for (const user of userList) {
    const password = await bcrypt.hash(user.password, saltRounds);
    data.push([user.email, password]);
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
