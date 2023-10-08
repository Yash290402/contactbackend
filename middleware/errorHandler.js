
const { contants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {

        case contants.VALIDATION_ERROR:
            res.json({ title: "validation Failed", message: err.message, stackTrace: err.stack });
            break;

        case contants.NOT_FOUND:
            res.json({ title: "Not found", message: err.message, stackTrace: err.stack });
            break;

        case contants.UNAUTHORIZED:
            res.json({ title: "UNAUTHORIZED", message: err.message, stackTrace: err.stack });
            break;

        case contants.FORBIDDEN:
            res.json({ title: "FORBIDDEN", message: err.message, stackTrace: err.stack });
            break;

        case contants.SERVER_ERROR:
            res.json({ title: "SERVER_ERROR", message: err.message, stackTrace: err.stack });
            break;

        default:
            console.log("no error message");
            break;
    }




};

module.exports = errorHandler;