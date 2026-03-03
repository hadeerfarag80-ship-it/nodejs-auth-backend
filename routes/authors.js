
 const express = require("express");
const router = express.Router();
const Joi = require("joi");
const asynchandler = require("express-async-handler");
const { Author, validateCreatauthours, validateUpdateBooks } = require("../models/Author");
const { verifyTokenAdmin } = require("../middlewares/verifyToken");
// Middleware
router.use(express.json());

// GET all books
router.get("/" , asynchandler(async (req, res) => {
    const authorlist = await Author.find()
    res.json(authorlist);
}));
// GET author by id no validation
router.get("/:id", asynchandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
        if (author) {
            res.status(200).json(author);
        } else {
            res.status(404).json({ message: "author not found" });
        }
   
}));

// POST add new book with validation
router.post("/", verifyTokenAdmin, asynchandler(async (req, res) => {
    const { error } = validateCreatauthours(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const auther = new Author({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        nationality:req.body.nationality,
        Image:req.body.Image
    });

    await auther.save();
    res.status(201).json(auther);
}));


/////////////////////////////////////////////////put
router.put("/:id", verifyTokenAdmin, asynchandler(async (req, res) => {


    const { error } = validateUpdateBooks(req.body);
     if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
   const author = await Author.findByIdAndUpdate(req.params.id, {
        $set: {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        nationality:req.body.nationality,
        Image:req.body.Image,
        }
    }, { new: true });
    res.status(200).json(author);
}));

///////////////////////////////////////////////////////////////////////////////delete no validation

router.delete("/:id",verifyTokenAdmin, asynchandler(async (req, res) => {
    
    const auther= await Author.findByIdAndDelete(req.params.id);
    if (auther) {
        res.status(200).json({message:"author has been deleted"});
    } else {
        res.status(404).json({ message: "author not found" });
    }
   
}));

module.exports = router;

