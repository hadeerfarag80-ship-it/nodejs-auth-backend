const {book} = require("./models/Book");
const{Author} = require("./models/Author");
const {books,authors}= require("./data");
const connectDB = require("./config/db");
require("dotenv").config();
// connection to DB
connectDB();
// import Books (seeding database)
const importBooks = async () => {
    try {
        await book.insertMany(books);
        console.log("Books imported");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
// import Authors (seeding database)
const importAuthors = async () => {
    try {
        await Author.insertMany(authors);
        console.log("Authors imported");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
// remove Books
const removeBooks = async () => {
    try {
        await book.deleteMany();
        console.log("Books removed!");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
if(process.argv[2] === "-import"){
    importBooks();
}
else if(process.argv[2] === "-remove"){
    removeBooks();
}
else if(process.argv[2] === "-import-authors"){
    importAuthors();
}
console.log(book);