const router = require('express')()

// /api/item
router.route('/')
    .post(controllers.createOne)

// /api/item/:id
router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.removeOne)

module.exports = router