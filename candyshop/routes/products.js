const router = require('express')()

const sequelize = require('../storage.js')
const productModel = require('../products.js')

// /api/item
router.route('/')
    .get((req, res) => {
        productModel.findAll().then((data)=>{
            console.log(data)
        })
        res.json({data: 77})
    })
    .post((req, res) => res.json(req.body))


// /api/item/:id
// router.route('/:id')
//     .get(controllers.getOne)
//     .put(controllers.updateOne)
//     .delete(controllers.removeOne)

module.exports = router