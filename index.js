const books = require('./routes/books')
const home = require('./routes/home')
const express = require('express');

const app = express();
app.use(express.json())

app.use('/', home)
app.use('/api/books', books)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`${port} - portni eshitishni boshladim...`)
})
