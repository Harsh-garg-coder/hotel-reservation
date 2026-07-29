export default function genericErrorHandler(err, req, res, next) {
    res.status(err.statusCode).json({
        message: err.message,
        success: false
    });
}