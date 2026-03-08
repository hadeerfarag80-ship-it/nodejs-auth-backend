const express = require("express");
const { getforgotPasswordView } = require("../controllers/passwordController");
const router = express.Router();
// password/forgot-password
router.route("/forgot-password").get(getforgotPasswordView)



module.exports = router;