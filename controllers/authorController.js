const asynchandler = require("express-async-handler");
const { Author, validateCreatauthours, validateUpdateBooks } = require("../models/Author");
const { verifyTokenAdmin } = require("../middlewares/verifyToken");
// get all authors
const getAllAuthors =asynchandler(async (req, res) => {
    //pagination => skip().limit()
    const {pageNumber} = req.query;
    const authorsPerpage = 2;
    const authorlist = await Author.find().skip((pageNumber - 1) * authorsPerpage).limit(authorsPerpage);
    res.json(authorlist);
});
// get auther by id 
const getauthorByid = asynchandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
        if (author) {
            res.status(200).json(author);
        } else {
            res.status(404).json({ message: "author not found" });
        }
   
});
// creat author
const creatauthor = asynchandler(async (req, res) => {
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
});
// update Author
const updateAuthor =  asynchandler(async (req, res) => {


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
});
const deleteAuthor = asynchandler(async (req, res) => {
    
    const auther= await Author.findByIdAndDelete(req.params.id);
    if (auther) {
        res.status(200).json({message:"author has been deleted"});
    } else {
        res.status(404).json({ message: "author not found" });
    }
   
});
module.exports = {
    getAllAuthors,
    getauthorByid,
    creatauthor,
    updateAuthor,
    deleteAuthor
};