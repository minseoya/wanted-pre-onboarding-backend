const userService = require("../services/userService");
const { catchError } = require("../utils/errors");

const signUp = catchError(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  await userService.signUp({ email, password });
  return res.status(201).json({ message: "SIGNUP_SUCCESS" });
});

const signIn = catchError(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const token = await userService.signIn({ email, password });
  return res.status(200).json(token);
});
module.exports = { signUp, signIn };
