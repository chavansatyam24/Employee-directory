
const errorMiddleware = (error, req, res, next) => {
    console.error(error);

    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "An employee with this email already exists"
        });
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    if (error.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid employee ID"
        });
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.statusCode
            ? error.message
            : "Internal server error"
    });
};

module.exports = errorMiddleware;
