const express = require("express")
const app = express()
const poll = require("./database/conn")
const { engine } = require('express-handlebars')


app.engine("handlebars", engine())
app.set('view engine', 'handlebars')

app.use(express.static("public"))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())




app.get('/', (req, res) => {
    res.render('home')
})


app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pagesqty = req.body.pagesqty

    const sql = `INSERT INTO books (??, ??) VALUES (?,?)`
    const data = ['title','pagesqty', title, pagesqty]
    poll.query(sql, data, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/books')

    })
})




app.get('/books', (req, res) => {
    const sql = "select * from books"
    poll.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const books = data
        res.render('books', { books })
    })
})

app.get("/books/:id", (req, res) => {
    const id = req.params.id
    const sql = `select * from books where id = ${id}`

    poll.query(sql, function (err, data) {
        if (err) {
            console.log(err)
        }
        const book = data[0]

        res.render('book', { book })
    })


})


app.get("/books/edit/:id", (req, res) => {
    const id = req.params.id
    const sql = `select * from books where id = ${id}`

    poll.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]
        res.render("editbook", { book })
    })
})


app.post("/books/updatebooks", (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pagesqty = req.body.pagesqty

    const sql = `update books set ?? = ?, ?? = ? where ?? = ?`
const data = ['title',title, 'pagesqty', pagesqty,'id', id]
    poll.query(sql,data, function (err, data) {
        if (err) {
            console.log(err)
        }

        res.redirect("/books")
    })
})

app.post("/books/remove/:id", (req, res) => {
    const id = req.params.id
    const sql = `delete from books where ?? = ?`
    const data = ['id', id]
    poll.query(sql, data, function (err, data) {
        if (err) {
            console.log(err)
        }

        res.redirect('/books')
    })
})






app.listen(1337, () => {
    console.log('servidor em execução')
})