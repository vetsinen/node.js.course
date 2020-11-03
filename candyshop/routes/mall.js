const express = require('express');
const router = express.Router();

const productModel = require('../productModel.js')
const {orderModel, orderItemModel} = require('../cartModel.js')
const userModel = require('../userModel')
const {isAdmin, isRegular, getVerifiedToken} = require('../authMiddleware')
const logger = require('../logger.js')

router.post('/product',isAdmin, (req, res) => {
    logger.info( `${req.id} - create product`);
    productModel.create({
            title: req.body.title,
            price: req.body.price
        }).then(res.send('thanks for adding ' + req.body.title))
    }
)
const encart = async (productIds) => {
    let total = 0
    const products = productIds.map(id => productModel.findByPk(id))
    values = await Promise.all(products)
    values.forEach(value => total += value.get('price'))
    await orderModel.create({
        total: total,
        isPending: true
    })
    return Promise.resolve(total)
}

router.post('/encart/',isRegular, (req, res) => {
    logger.info( `${req.id} - cart creation`);
    const productIds = req.body
    if (productIds.length === 0) {
        res.status(403).send('error: no products to add')
        return
    }
    encart(productIds).then(total => res.send('ok '+total))
})

router.patch('/purchase/:id',isRegular, async (req, res) => {
    const purchaseId = req.params.id
    const order = await orderModel.findByPk(purchaseId)
    if (!order.get('isPending')){
        res.status(400).json({error:'already taken'})
    }
    const login = getVerifiedToken(req).login
    const user = await userModel.findOne({where: {login: login}})

    const budget = user.get('budget')
    if (budget<order.get('total')){
        res.status(400).json({error:'get rich or die tryin'})
        return
    }
    await user.update({budget: budget-order.get('total')})
    await order.update({isPending: false})
    res.send('now you can lick your lollipop')
})

/* GET home page. */
router.get('/', function (req, res, next) {
    logger.info( `${req.id} - index action`);
    res.send('Welcome to CandyShop')

});



module.exports = router;
