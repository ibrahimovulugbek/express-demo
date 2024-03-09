const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: async function (value, callback) {
                setTimeout(() => {
                    const result = value && value.length > 0;
                    callback(result);
                }, 10)
            },
            message: "Kitob tegining uzunligi kamida 1 bo'lish kerak"
        }
    },
    isPublished: Boolean,
    pages: Number,
    date: { type: Date, default: Date.now() },
    price: {
        type: Number,
        required: function () {
            return this.isPublished
        },
        min: 10000,
        max: 300000,
        get: val => Math.round(val),
        set: val => Math.round(val)
    },
    category: {
        type: String,
        required: true,
        enum: ['classic', "biography", "sience"]
    }
})

module.exports = bookSchema;