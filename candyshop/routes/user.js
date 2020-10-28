var express = require('express');
var router = express.Router();
const userModel = require('../userModel')
const md5 = require('md5')

router.post('/signup', function(req, res, next) {
  res.send('respond with a resource');
  budget = req.body.budget || 0;
  userModel.create({
    login: req.body.login,
    md5hash: md5(req.body.password),
    budget: budget,
    isAdmin: false
  })
});

router.patch('/switch/:id', (req, res) => {
  user = userModel.findOne()//TODO
  const isAdmin = user.get('isAdmin')
  user.set('isAdmin',!isAdmin)
})

router.patch('enrich/:id', (req, res) => {
  user = userModel.findOne()//TODO
  const budget = user.get('budget')
  user.set('budget',)
})

module.exports = router;
