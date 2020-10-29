const express = require('express');
const router = express.Router();

const productModel = require('../productModel.js')
const {orderModel, orderItemModel} = require('../cartModel.js')
const {isAdmin, isRegular} = require('../auth.middleware')

router.post('/product',isAdmin, (req, res) => {
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
    values = await Promise.all(products)
    values.forEach(value => total += value.get('price'))
    console.log(`total in ${total}`)
    await orderModel.create({
        total: total,
        isPending: true
    })
    return Promise.resolve(total)
}

router.post('/encart/',isRegular, (req, res) => {
    const productIds = req.body

    if (productIds.length === 0) {
        res.status(403).send('error: no products to add')
        return
    }
    encart(productIds).then(total => res.send('ok '+total))
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
