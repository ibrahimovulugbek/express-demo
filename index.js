const express = require('express');
const books = require('./books');
const { body, validationResult } = require('express-validator')
const app = express();
app.use(express.json())


app.get('/', (req, res) => {
    res.send("Assalomu alaykum!")
})

app.get('/api/books', (req, res) => {
    res.send(books)
})

app.get('/api/books/:id', (req, res) => {
    let booook = books.find(book => {
        return book.id === parseInt(req.params.id)
    })


    if (!booook)
        res.status(404).send("Bunday kitob topilmadi!!!")

    res.send(booook)
})

app.post('/api/books',
    [
        [
            body('name').isString(),
            body('name').trim().notEmpty()
        ]
    ],
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            res.status(400).send(errors.array())

        let book = {
            id: books.length + 1,
            name: req.body.name
        }
        books.push(book)
        res.status(201).send(book);
    }
)


app.put('/api/books/:id',
    [
        [
            body('name').isString(),
            body('name').trim().notEmpty()
        ]
    ],
    (req, res) => {
        const book = books.find(book => book.id === parseInt(req.params.id));
        if (!book) {
            res.status(404).send("Bunday kitob mavjud emas!")
        }
        const errors = validationResult(req)
        if (!errors.isEmpty())
            res.status(400).send("Name parameti to'g'ri kiritilmagan!!")
        book.title = req.body.name
        res.send(book)
    })

app.delete('/api/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book)
        res.status(404).send("Bunday kitob mavjud emas!")

    // const findIndex = books.findIndex(book => book.id === parseInt(req.params.id))
    const findIndex= books.indexOf(book)
    books.splice(findIndex, 1)

    res.send("Successfully deleted!!!")
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`${port} - portni eshitishni boshladim...`)
})
