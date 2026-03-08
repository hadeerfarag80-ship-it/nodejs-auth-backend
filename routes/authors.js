
 const express = require("express");
const router = express.Router();
const Joi = require("joi");
const asynchandler = require("express-async-handler");
const { Author, validateCreatauthours, validateUpdateBooks } = require("../models/Author");
const { verifyTokenAdmin } = require("../middlewares/verifyToken");
const{ getAllAuthors ,getauthorByid,creatauthor, updateAuthor,deleteAuthor} = require("../controllers/authorController");
// Middleware
router.use(express.json());

// GET all authors with pagination
router.get("/" , getAllAuthors);
// GET author by id no validation
router.get("/:id",getauthorByid );
// POST add new author with validation
router.post("/", verifyTokenAdmin,creatauthor );
// update author
router.put("/:id", verifyTokenAdmin,updateAuthor );
// delete author 
router.delete("/:id",verifyTokenAdmin,deleteAuthor);

module.exports = router;


