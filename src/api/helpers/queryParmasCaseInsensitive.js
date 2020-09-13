
function queryParmasCaseInsensitive(req, res, next) {
    req.query = new Proxy(req.query, {
        get: (target, name) => target[Object.keys(target)
            .find(key => key.toLowerCase() === name.toLowerCase())]
    })
    next();
}

module.exports = queryParmasCaseInsensitive;