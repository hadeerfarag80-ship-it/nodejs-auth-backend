// const express = require("express");
// const app = express();

// const productRoutes = require("./route/productRout");

// app.use(express.json());

// app.use("/api/products", productRoutes);

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });
 const express = require("express");
 const app = express();
 const Joi = require("joi"); 
const connectDB = require("./config/db");
 const logger = require("./middlewares/logger");
 const {notfound , errorHandler} = require("./middlewares/errors")
require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

 // connection to Database
 mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("connected to mongoDB...."))
    .catch((error) => console.log("connection filed to mongoDB!",error));

  // Middleware
 app.use(express.json());
  app.use(logger);
 //routes
 app.use("/api/books",require("./routes/books"));
app.use("/api/authors",require("./routes/authors"));
app.use("/api/auth",require("./routes/auth"));
app.use("/api/users",require("./routes/users"));
// error handling middleware
app.use(notfound);
app.use(errorHandler);
// // Run server
 const port = process.env.PORT || 5000;
 app.listen(port, () => console.log(`Server is running in ${process.env.NODE_ENV} port ${port}`));