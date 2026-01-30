const express = require("express");
const router = express.Router();
const Joi = require("joi"); 

const books = [
    { id: 1, auther: "nasam taleb", title: "black swan" },
    { id: 2, auther: "nasam taleb", title: "black swan" },
];

// Middleware
router.use(express.json());

// GET all books
router.get("/", (req, res) => {
    res.json(books);
});

// GET book by id no validation
router.get("/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "book not found" });
    }
});

// POST add new book with validation
router.post("/", (req, res) => {


    const { error } = validateCreatBooks(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const book = {
        id: books.length + 1,
        title: req.body.title,
        auther: req.body.auther
    };

    books.push(book);
    res.status(201).json(book);
});

//// validation post
function validateCreatBooks(obj){
 const schema = Joi.object({

 title:Joi.string().trim().min(3).max(200).required(),
 auther:Joi.string().trim().min(3).max(200).required(),

 });
return schema.validate(obj);



}

/////////////////////////////////////////////////put
router.put("/:id", (req, res) => {


    const { error } = validateUpdateBooks(req.body);
     if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json({message:"book has been update"});
    } else {
        res.status(404).json({ message: "book not found" });
    }


});
////validation put
 function validateUpdateBooks(obj){
 const schema = Joi.object({

    title:Joi.string().trim().min(3).max(200),
    auther:Joi.string().trim().min(3).max(200),

 });
 return schema.validate(obj);
 }
///////////////////////////////////////////////////////////////////////////////delete no validation

router.delete("/:id", (req, res) => {


   
    
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json({message:"book has been deleted"});
    } else {
        res.status(404).json({ message: "book not found" });
    }


});

module.exports = router;
