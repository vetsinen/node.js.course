const express = require('express');
const router = express.Router();

const productModel = require('../productModel.js')
const {orderModel, orderItemModel} = require('../cartModel.js')

router.post('/product', (req, res) => {
        productModel.create({
            title: req.body.title,
            price: req.body.price
        }).then(res.send('thanks for adding ' + req.body.title))
    }
)
const encart = async (productIds) => {
    console.log('entering encart')
    let total = 0
    const products = productIds.map(id => productModel.findByPk(id))
    Promise.all(products).then(async values => {
        values.forEach(value => total += value.get('price'))
        console.log(`total in ${total}`)
        await orderModel.create({
            total: total,
            isPending: true
        })
        return Promise.resolve(total)
    })
}

router.post('/encart/', (req, res) => {
    const productIds = req.body
    if (productIds.length === 0) {
        res.status(403)
    }
    encart(productIds).then(orderId => res.send(orderId))
})

router.patch('/purchase/:id', (req, res) => {
    const purchaseId = req.params.id
    res.send('entering to purchase ' + purchaseId)
})

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Welcome to CandyShop');
});


module.exports = router;
