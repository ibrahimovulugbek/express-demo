const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require("mongoose");
const bookSchema = require("./book-schema");

const Book = mongoose.model("Book", bookSchema)

router.get('/', async (req, res) => {
    const books = await Book.find()
    res.send(books)
})

router.get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id)
    if (!book)
        return res.status(404).send("Bunday kitob topilmadi!!!")

    res.send(book)
})

router.post('/',
    [
        [
            body('title').isString(),
            body('title').trim().notEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).send(errors.array())

        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            tags: req.body.tags,
            isPublished: req.body.isPublished,
            pages: req.body.pages || null,
            price: req.body.price,
            category: req.body.category,
            lowercase: req.body.lowercase || true,
            trim: req.body.trim || true
        })
        try {
            const createBook = await newBook.save()
            res.status(201).send(createBook);
        } catch (err) {
            console.log(err);
        }
    }
)

router.put('/:id',
    [
        [
            body('title').isString(),
            body('title').trim().notEmpty()
        ]
    ],
    async (req, res) => {
        const book = await Book.updateMany({ _id: req.params.id }, {
            $set: {
                author: "Dildora",
                isPublished: false
            }
        })
        if (!book) {
            return res.status(404).send("Bunday kitob mavjud emas!")
        }

        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).send("title parameti to'g'ri kiritilmagan!!")

        res.send(book)
    })

router.delete('/:id', async (req, res) => {
    const book = await Book.findByIdAndRemove({ _id: req.params.id });
    if (!book)
        return res.status(404).send("Bunday kitob mavjud emas!")

    const deletedBook = Book.deleteOne({ _id: req.params.id })

    res.send(deletedBook)
})


module.exports = router