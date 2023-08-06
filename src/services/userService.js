const bcrypt = require("bcrypt");
const userDao = require("../models/userDao");
const jwt = require("jsonwebtoken");
const { BaseError } = require("../utils/errors");

const signUp = async ({ email, password }) => {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  validateInputs(email, password);
  return userDao.signUp({ email, hashedPassword });
};

const signIn = async ({ email, password }) => {
  try {
    validateInputs(email, password);

    const user = await userDao.getUserByEmail(email);
    validatePasswordMatch(password, user.password);

    const payLoad = { id: user.id };
    const jwtToken = generateToken(payLoad);

    return { Token: jwtToken };
  } catch (error) {
    handleSignInError(error);
  }
};

const isEmailValid = (email) => /@/.test(email);

const isPasswordValid = (password) => password.length >= 8;

const validateInputs = (email, password) => {
  if (!isEmailValid(email)) {
    throw new BaseError("올바른 이메일 형식이 아닙니다.", 401);
  }

  if (!isPasswordValid(password)) {
    throw new BaseError("비밀번호는 8자 이상이어야 합니다.", 401);
  }
};

const validatePasswordMatch = async (inputPassword, storedPassword) => {
  const isMatch = await bcrypt.compare(inputPassword, storedPassword);

  if (!isMatch) {
    throw new BaseError("PASSWORD_NOT_MATCH", 401);
  }
};

const generateToken = (payLoad) => {
  const jwtToken = jwt.sign(payLoad, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return jwtToken;
};

const handleSignInError = (error) => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  throw error;
};

module.exports = { signUp, signIn };
