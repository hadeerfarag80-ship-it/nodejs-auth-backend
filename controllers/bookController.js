const asynchandler = require("express-async-handler");
const {book ,validateCreatBooks,validateUpdateBooks} = require("../models/Book");
// GET all books
const getallBooks = asynchandler(async(req,res)=> {
 const {minPrice, maxPrice} = req.query;
 let books;
 if(minPrice && maxPrice){
    books = await book.find({ price: { $gte: minPrice , $lte : maxPrice } });
 }else{
    books = await book.find().populate("author", ["firstName", "lastName", "-_id"]);
 }
 res.status(200).json(books);
});
// GET book by id
const BookById =asynchandler(async (req, res) => {
    const Book = await book
        .findById(req.params.id)
        .populate("author", ["firstName", "lastName", "-_id"]);

    if (Book) {
        res.status(200).json(Book);
    } else {
        res.status(404).json({ message: "book not found" });
    }
});
// POST add new book with validation
const createBook =  asynchandler(async(req, res) => {
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
});
// PUT update book by id with validation
const updateBook =  asynchandler(async(req, res) => {
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


});
// DELETE book by id no validation
const deleteBook = asynchandler(async(req, res) => {
    const bookToDelete = await book.findById(req.params.id);
    if (bookToDelete) {
        await book.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"book has been deleted"});
    } else {
        res.status(404).json({ message: "book not found" });
    }


});

module.exports = {
getallBooks,
BookById,
createBook,
updateBook,
deleteBook
}