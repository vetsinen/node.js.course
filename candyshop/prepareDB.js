#!/usr/bin/env node

const productModel = require('./productModel.js')
const userModel = require('./userModel')
const {orderModel, orderItemModel} = require('./cartModel')
const md5 = require('md5')

console.log('starting db init')

const syncTables = async () => {
    // await User.sync()
    await productModel.sync({force: true})
    await userModel.sync({force: true})
    await orderModel.sync({force: true})
    await orderItemModel.sync({force: true})
    // await order.sync()
    // await orderItem.sync()
    console.log('tables synced')
}

const dbFeeder = async () => {
    await productModel.create({
        id: 42,
        title: 'lollipop',
        price: 0.50,
    })

    await productModel.create({
        id: 24,
        title: 'milk',
        price: 0.2,
    })

    await userModel.create(
        {
            id: 1,
            login: 'drdre',
            md5hash: md5('N.W.A and Ruthless Records'),
            budget: 100000,
            isAdmin: true
        })

    await userModel.create(
        {
            id: 2,
            login: 'curtis',
            md5hash: md5('Move to Aftermath Entertainment'),
            budget: 10,
            isAdmin: false
        }
    )

    await userModel.create(
        {
            id: 3,
            login: 'olivia',
            md5hash: md5('Surviving Compton'),
            budget: 0,
            isAdmin: false
        }
    )

    await orderModel.create({
        id: 1,
        isPending: true,
        total: 1
    })

    await orderItemModel.create({
        refOrder: 1,
        refProduct: 42
    })
    await orderItemModel.create({
        refOrder: 1,
        refProduct: 42
    })

    console.log('db feeded')
}

const main = async () => {
    await syncTables()
    await dbFeeder()
}

main()

module.exports = main