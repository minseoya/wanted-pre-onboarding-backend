const express = require("express");
const postController = require("../controllers/postController");
const checkLogInToken = require("../utils/auth");

const router = express.Router();

router.post("", checkLogInToken, postController.createPost);
router.delete("/:postId", checkLogInToken, postController.deletePost);
router.get("/:postId", checkLogInToken, postController.getPostById);
router.get("/:offset/:limit", checkLogInToken, postController.getPostList);

module.exports = { router };