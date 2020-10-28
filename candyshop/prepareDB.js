#!/usr/bin/env node

const productModel = require('./productModel.js')
const userModel = require('./userModel')
const {orderModel, orderItemModel} = require('./cartModel')

console.log('starting db init')

const syncTables =async ()=>{
    // await User.sync()
    await productModel.sync({ force: true })
    await userModel.sync({force: true})
    await orderModel.sync({ force: true })
    await orderItemModel.sync({ force: true })
    // await order.sync()
    // await orderItem.sync()
    console.log('db synced')
}

syncTables()