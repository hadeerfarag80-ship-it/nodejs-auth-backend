const express = require("express");
const router = express.Router();
const Joi = require("joi");
const authors = [
{
    id : 1,
    firstname:"hadeer",
    lastname:"farag",

}
]


// Middleware
router.use(express.json());

// GET all books
router.get("/", (req, res) => {
    res.json(authors);
});

// GET author by id no validation
router.get("/:id", (req, res) => {
    const auther = authors.find(b => b.id === parseInt(req.params.id));
    if (auther) {
        res.status(200).json(auther);
    } else {
        res.status(404).json({ message: "authour not found" });
    }
});

// POST add new book with validation
router.post("/", (req, res) => {


    const { error } = validateCreatauthours(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const auther = {
        id: authors.length + 1,
       firstname:req.body.firstname,
        lastname:req.body.lastname,

    };

    authors.push(auther);
    res.status(201).json(auther);
});

//// validation post
function validateCreatauthours(obj){
 const schema = Joi.object({

 firstname:Joi.string().trim().min(3).max(200).required(),
 lastname:Joi.string().trim().min(3).max(200).required(),

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
    const auther= authors.find(b => b.id === parseInt(req.params.id));
    if (auther) {
        res.status(200).json({message:"author has been update"});
    } else {
        res.status(404).json({ message: "author not found" });
    }


});
////validation put
 function validateUpdateBooks(obj){
 const schema = Joi.object({

    firstname:Joi.string().trim().min(3).max(200),
    lastname:Joi.string().trim().min(3).max(200),

 });
 return schema.validate(obj);
 }
///////////////////////////////////////////////////////////////////////////////delete no validation

router.delete("/:id", (req, res) => {


   
    
    const auther= authors.find(b => b.id === parseInt(req.params.id));
    if (auther) {
        res.status(200).json({message:"author has been deleted"});
    } else {
        res.status(404).json({ message: "author not found" });
    }


});

module.exports = router;

