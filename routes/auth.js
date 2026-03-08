const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");
const bcrypt = require('bcryptjs');
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const {register,login} = require("../controllers/authController");
// api /auth/register
router.post("/register" ,register);
// api /auth/login
router.post("/login" ,login);

module.exports = router;