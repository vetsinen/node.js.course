const express = require('express');
const router = express.Router();
const productModel = require('../productModel.js')

router.post('/product', (req, res) => {
        productModel.create({
            title: req.body.title,
            price: req.body.price
        }).then(res.send('thanks for adding ' + req.body.title))
    }
)

router.post('/encart/',(req, res)=>{
    const productIds = req.body
    console.log('entering encart')
    if (productIds.length===0){res.send('no products to add')}
    const prId = productIds[0]
    productModel.findByPk(prId).then(product=>{
        console.log(`we found ${prId} with price ${product.get('price')}`)
    })
    res.json(productIds)
})

router.patch('/purchase/:id',(req, res)=>{
    const purchaseId = req.params.id
    res.send('entering to purchase '+purchaseId)
})

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Welcome to CandyShop');
});


module.exports = router;
