const productModel = require('./productModel.js')

const calcTotal = productIds=>{
    let total = 0
    const products = productIds.map(id=>productModel.findByPk(id))
    Promise.all(products).then(values=> {
        values.forEach(value=>total+=value.get('price'))
        console.log(`total in ${total}`)
    })
}

calcTotal([42, 24, 42 , 42])