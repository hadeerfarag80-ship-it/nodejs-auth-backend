const express = require("express");
const router = express.Router();
const Joi = require("joi");
const asynchandler = require("express-async-handler");
const {book ,validateCreatBooks,validateUpdateBooks} = require("../models/Book");
const { verifyTokenAdmin } = require("../middlewares/verifyToken");
const {getallBooks , BookById ,createBook,updateBook, deleteBook} = require("../controllers/bookController");
// Middleware
router.use(express.json());
 // comparison query operators
 // $qe (equal) 
 // $ne (not equal)  
 //$lt (less than)
 //$lte (less than and equal)
 //$gt (greater than)
 //$gte (greater than and equal)
 // $in (in array [8,9])
 // $nin (not in array)

router.get("/", getallBooks);
router.get("/:id", BookById);
router.post("/",verifyTokenAdmin, createBook);
router.put("/:id",verifyTokenAdmin, updateBook);
router.delete("/:id",verifyTokenAdmin,deleteBook);

module.exports = router;
