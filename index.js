function isBodyParserError(error) {
    const bodyParserCommonErrorsTypes = [
        'encoding.unsupported',
        'entity.parse.failed',
        'entity.verify.failed',
        'request.aborted',
        'request.size.invalid',
        'stream.encoding.set',
        'parameters.too.many',
        'charset.unsupported',
        'encoding.unsupported',
        'entity.too.large'
    ];
    return bodyParserCommonErrorsTypes.includes(error.type);
}


function bodyParserErrorHandler(
    {
        onError = (err, req, res) => {
        },
        errorMessage = (err) => {
            return `Body Parser failed to parse request --> ${err.message}`
        }
    }) {
    return (err, req, res, next) => {
        if (err && isBodyParserError(err)) {
            onError(err, req, res);
            res.status(err.status);
            res.send({message: errorMessage(err)});
        } else if (err) {
            next(err);
        } else next();
    };
}

module.exports = bodyParserErrorHandler
