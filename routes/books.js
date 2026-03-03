const express = require("express");
const router = express.Router();
const Joi = require("joi");
const asynchandler = require("express-async-handler");
const {book ,validateCreatBooks,validateUpdateBooks} = require("../models/Book");
const { verifyTokenAdmin } = require("../middlewares/verifyToken");
// Middleware
router.use(express.json());

// GET all books
router.get("/",asynchandler(async(req,res)=> {
const books = await book.find()//.populate("author", ["-id", "firstName", "lastName"]);
res.status(200).json(books);
}));

router.get("/:id", asynchandler(async (req, res) => {
    const Book = await book
        .findById(req.params.id)
        .populate("author", ["firstName", "lastName", "-_id"]);

    if (Book) {
        res.status(200).json(Book);
    } else {
        res.status(404).json({ message: "book not found" });
    }
}));
// POST add new book with validation
router.post("/",verifyTokenAdmin, asynchandler(async(req, res) => {
    const { error } = validateCreatBooks(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const bookNew = new book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover
    });

    const result = await bookNew.save();
    res.status(201).json(result);
}));



/////////////////////////////////////////////////put
router.put("/:id",verifyTokenAdmin, asynchandler(async(req, res) => {
    const { error } = validateUpdateBooks(req.body);
     if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    const updateBook = await book.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        }
    }, { new: true });
    res.status(200).json(updateBook);


}));
///////////////////////////////////////////////////////////////////////////////delete no validation

router.delete("/:id",verifyTokenAdmin,asynchandler(async(req, res) => {


   
    
    const bookToDelete = await book.findById(req.params.id);
    if (bookToDelete) {
        await book.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"book has been deleted"});
    } else {
        res.status(404).json({ message: "book not found" });
    }


}));

module.exports = router;
