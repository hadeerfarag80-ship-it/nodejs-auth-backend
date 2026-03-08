const express = require("express");
const router = express.Router();
const asynchandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const {User , validateUpdateUser} = require("../models/User");
const jwt = require("jsonwebtoken");
const {verifyTokenAuthorization,verifyTokenAdmin} = require("../middlewares/verifyToken");
const { getallUsers,getuserById, updateUser,deleteUser } = require("../controllers/userController");
// update user
router.put("/:id" , verifyTokenAuthorization, updateUser);
// get all users
router.get("/" , verifyTokenAdmin, getallUsers);
// get user by id
router.get("/:id" , verifyTokenAuthorization, getuserById);
// delete user by id
router.delete("/:id" , verifyTokenAuthorization, deleteUser);

module.exports = router;