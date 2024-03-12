const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: { type: String, require: true },
    phone: String,
    isVip: { type: Boolean, default: false }
})

module.exports = customerSchema;