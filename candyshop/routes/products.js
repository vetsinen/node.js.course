const router = require('express')()

const connection = require('../connection.js')
const productModel = require('../products.js')

// /api/item
router.get('/', (req, res) => {
    productModel.findAll({
        attributes: ['title',]
    }).then((data) => {
        console.log(data)
        res.json(JSON.stringify(data, null, 2))
    })
})

router.post('/',(req, res)=>{
    res.json(req.body)
})
// .post((req, res) => res.json(req.body))


// /api/item/:id
// router.route('/:id')
//     .get(controllers.getOne)
//     .put(controllers.updateOne)
//     .delete(controllers.removeOne)

module.exports = router