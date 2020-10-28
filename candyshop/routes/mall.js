const express = require('express');
const router = express.Router();

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
