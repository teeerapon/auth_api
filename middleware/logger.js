
const moment = require('moment')

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    if (!req.is('application/json')) {
        return res.status(403).send("Invalid ContentType");
    } 
    next();
}


module.exports = logger;