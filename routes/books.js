const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const books = [
    { id: 1, title: "Zukkolar va landavurlar" },
    { id: 2, title: "Iroda kuchi" },
    { id: 3, title: "Diqqat" },
    { id: 4, title: "Atom odatlar" },
    { id: 5, title: "Mafavvaqiyatli insonlarning 7 ko'nikmasi" }
]


router.get('/', (req, res) => {
    res.send(books)
})

router.get('/:id', (req, res) => {
    let booook = books.find(book => {
        return book.id === parseInt(req.params.id)
    })

    if (!booook)
        return res.status(404).send("Bunday kitob topilmadi!!!")

    res.send(booook)
})

router.post('/',
    [
        [
            body('name').isString(),
            body('name').trim().notEmpty()
        ]
    ],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).send(errors.array())

        let book = {
            id: books.length + 1,
            name: req.body.name
        }
        books.push(book)
        res.status(201).send(book);
    }
)

router.put('/:id',
    [
        [
            body('name').isString(),
            body('name').trim().notEmpty()
        ]
    ],
    (req, res) => {
        const book = books.find(book => book.id === parseInt(req.params.id));
        if (!book) {
            return res.status(404).send("Bunday kitob mavjud emas!")
        }
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).send("Name parameti to'g'ri kiritilmagan!!")

        book.title = req.body.name
        res.send(book)
    })

router.delete('/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).send("Bunday kitob mavjud emas!")

    const findIndex = books.indexOf(book)
    books.splice(findIndex, 1)

    res.send("Successfully deleted!!!")
})


module.exports = router