const express = require('express');
const router = express.Router();
const productModel = require('../productModel.js')

router.post('/products', (req, res) => {
        productModel.create({
            title: req.body.title,
            price: req.body.price
        }).then(res.send('thanks for adding ' + req.body.title))
    }
)

router.post('/encart/',(req, res)=>{
    const products = [1,4,7]
    console.log('entering encart')
    res.json(req.body)
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
