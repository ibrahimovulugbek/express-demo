const books = require('./routes/books')
const customers = require('./routes/customers')
const home = require('./routes/home')
const express = require('express');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')
    .then(() => {
        console.log("Mongodb ga ulanish hosil bo'ldi...")
    })
    .catch((err) => {
        console.log("Mongodb ga ulanib bo'lmadi!!!", err)
    })

const app = express();
app.use(express.json())
app.set('view engine', 'pug');

app.use('/', home)
app.use('/api/books', books)
app.use('/api/customers', customers)


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`${port} - portni eshitishni boshladim...`)
})
