const express = require('express');
const { default: mongoose } = require('mongoose');
const customerSchema = require('./customer-schema');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const Customer = mongoose.model("Customer", customerSchema)

router.get('/', async (req, res) => {
    const customers = await Customer.find()
    res.send(customers)
})

router.get('/:id', async (req, res) => {
    const findCustomer = await Customer.findById(req.params.id);
    if (!findCustomer)
        return res.status(404).send("Not found this customer")

    res.send(findCustomer);
})

router.post('/', [
    [
        body('name').isString(),
        body('name').trim().notEmpty(),
        body('phone').notEmpty(),
        body('phone').isString()
    ]
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).send(errors)

    const customerExists = Customer.findOne({ phone: req.body.phone });
    if (customerExists)
        return res.status(409).send("This customer already exists!!!")

    const newCustomer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isVip: req.body.isVip
    })

    try {
        const createCustomer = await newCustomer.save();
        res.status(201).send(createCustomer)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }

})


router.put('/:id', [
    [
        body('name').isString(),
        body('name').trim().notEmpty(),
        body('phone').notEmpty(),
        body('phone').isString()
    ]
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).send(errors)

    const findCustomer = await Customer.findById(req.params.id);
    if (!findCustomer)
        return res.status(404).send("Not found this customer")

    const customerExists = Customer.findOne({ phone: req.body.phone });
    if (customerExists)
        return res.status(409).send("This customer already exists!!!")

    const updateCustomer = await Customer.updateMany({
        name: req.body.name,
        phone: req.body.phone,
        isVip: req.body.isVip
    })

    res.send(updateCustomer.save())

})



router.delete('/:id', async (req, res) => {
    const findCustomer = await Customer.findById(req.params.id);
    if (!findCustomer)
        return res.status(404).send("Not found this customer");

    const deleteCustomer = await Customer.findByIdAndDelete(req.params.id);
    res.send(deleteCustomer);
})

module.exports = router

