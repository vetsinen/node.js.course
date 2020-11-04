var express = require('express');
var router = express.Router();
const md5 = require('md5')
const userModel = require('../userModel')

const jwt = require('jsonwebtoken');
const {secret} = require('../.env.js')


router.post('/signup', function (req, res, next) {
    if (!req.body.login || !req.body.password){
        res.statusCode(400).send('bad login or password')
    }
    res.send('respond with a resource');
    budget = req.body.budget || 0;
    userModel.create({
        login: req.body.login,
        md5hash: md5(req.body.password),
        budget: budget,
        isAdmin: false
    })
});

const login = async (req, res) => {
    console.log('attempt to login')
    const candidate = await userModel.findOne({where: {login: req.body.login}})
    if (!candidate) {
        res.status(401).send('login not found');
        return
    }
    console.log('we found you',candidate.get('login'),'your status is ', candidate.get('isAdmin'))

    console.log(md5(req.body.password),candidate.get('md5hash'))
    if (md5(req.body.password) !== candidate.get('md5hash')) {
        res.status(401).send('wrong password');
        return
    }
    console.log(`secret ${secret}`)
    //token = '__no token__'
    const token = 'Bearer ' + jwt.sign({
        login: candidate.get('login'),
        isAdmin: candidate.get('isAdmin')
    }, secret)
    res.json({token})
}

router.get('/login/', login)

router.patch('/switch/:id', (req, res) => {
    user = userModel.findOne()//TODO
    const isAdmin = user.get('isAdmin')
    user.set('isAdmin', !isAdmin)
})

router.patch('enrich/:id', (req, res) => {
    user = userModel.findOne()//TODO
    const budget = user.get('budget')
    user.set('budget',)
})

module.exports = router;
