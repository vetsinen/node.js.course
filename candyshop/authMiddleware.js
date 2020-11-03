const jwt = require('jsonwebtoken');
const {secret} = require('./.env.js')
const logger = require('./logger.js')

const getVerifiedToken = (req) => {
    logger.info( `${req.id} - verify token`);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {return}
    try {
        const decoded =  jwt.verify(token, secret);
        return(decoded)
    } catch(err) {
        logger.error('bad or apsent token provided')
    }
}

const isAdmin = async (req, res, next) => {
    const token = getVerifiedToken(req)
    logger.info( `${req.id} - check admin permissions`);

    if (!token){
        res.status(400).json({error:'no valid token'});
        return
    }
    if (token.isAdmin) {
        next();
        return
    }
    res.status(400).send('you have no admin rights')
}

const isRegular = (req, res, next) => {
    const token = getVerifiedToken(req)
    logger.info( `${req.id} - check regular permissions`);

    if (!token){
        res.status(400).json({error:'no valid token'});
        return }
    if (!token.isAdmin) {
        next();return
    }
    res.status(400).send('you have no customer rights')
}

module.exports = {isAdmin, isRegular, getVerifiedToken}