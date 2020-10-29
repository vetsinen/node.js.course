const jwt = require('jsonwebtoken');
const {secret} = require('./.env.js')

const getVerifiedToken = (req) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log('token ', token)
    if (!token) {return}
    try {
        const decoded =  jwt.verify(token, secret);
        console.log(decoded)
        return(decoded)
    } catch(err) {
        console.log('bad token provided')
    }
}

const isAdmin = async (req, res, next) => {
    const token = getVerifiedToken(req)
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
    if (!token){
        res.status(400).json({error:'no valid token'});
        return }
    if (!token.isAdmin) {
        next();return
    }
    res.status(400).send('you have no customer rights')
}

module.exports = {isAdmin, isRegular}