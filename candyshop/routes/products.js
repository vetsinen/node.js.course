const express = require('express');
const router = express.Router();

const connection = require('../connection.js')
const productModel = require('../products.js')

router.post('/', (req, res) => {
        productModel.create({
            title: req.body.title,
            price: req.body.price
        }).then(res.send('thanks for adding ' + req.body.title))
    }
)

// .post((req, res) => res.json(req.body))

// productModel.findAll({
//     attributes: ['title',]
// }).then((data) => {
//     console.log(data)
//     res.json(JSON.stringify(data, null, 2))
// /api/item/:id
// router.route('/:id')
//     .get(controllers.getOne)
//     .put(controllers.updateOne)
//     .delete(controllers.removeOne)

module.exports = router