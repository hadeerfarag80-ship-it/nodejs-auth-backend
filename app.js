const express = require("express");
const app = express();
const Joi = require("joi"); 
const bookspath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");
// connection to Database
mongoose.connect("mongodb://localhost/bookstoreDB")
    .then(() => console.log("connected to mongoDB...."))
    .catch((error) => console.log("connection filed to mongoDB!",error));

// Middleware
app.use(express.json());
// routes
app.use("/api/books",bookspath);
app.use("/api/authors",authorsPath);

// Run server
const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
