const notfound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (error, req, res, next) => {
    const statuCode = res.statusCode === 200? 500 : res.statusCode;
    res.status(statuCode).json({
        message: error.message
    })
}

module.exports = {
    notfound,
    errorHandler
};