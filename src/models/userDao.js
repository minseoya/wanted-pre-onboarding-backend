const appDataSource = require("./appDataSource");
const { DatabaseError } = require("../utils/errors");

const signUp = async ({ email, hashedPassword }) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(email,password) VALUES(?,?)`,
      [email, hashedPassword]
    );
  } catch (err) {
    throw new DatabaseError();
  }
};

const getUserByEmail = async (email) => {
  try {
    const [user] = await appDataSource.query(
      `SELECT
          id,
          email,
          password
      FROM
          users
      WHERE
          users.email = ?;
      `,
      [email]
    );
    return user;
  } catch (err) {
    const error = new DatabaseError("NOT_FOUND_EMAIL");
  }
};
const getUserById = async (id) => {
  const [user] = await appDataSource.query(
    `SELECT
          id,
          email,
          password
      FROM
          users
      WHERE
          users.id = ?;
      `,
    [id]
  );
  return user;
};

module.exports = { signUp, getUserByEmail, getUserById };
