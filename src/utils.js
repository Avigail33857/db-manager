const utils = {
    handleError: function handleError(err, res) {
        if (res !== null) {
            let message = err.message || err.body || err.err || err;
            console.error(`response - handleError: ${err}`);
            res.status(err.statusCode || err.status || 500).json({err: message});
        }
    }
}

module.exports = utils;
