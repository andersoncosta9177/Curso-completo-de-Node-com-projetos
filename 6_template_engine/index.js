const express = require("express")
const { engine } = require('express-handlebars');
const app = express()



//template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.get("/dashboard", (req, res) => {
    const itens = ['item 1', 'item 2', 'item 3', 'item 4']

    res.render("dashboard", { itens })
})


app.get("/post", (req,res)=>{
    const post = {
        title: 'Aprender js',
        category: 'javascritp',
        body: 'Este artigo lvat te ajudar a aprender js',
        comments: 5
    }

    res.render("post", {post})
}, )

const user = {
    name: 'Anderson',
    surname: 'Costa',
    age: 23,
    profissao: 'Programador'
}

const auth = false
aproved = true


app.get("/", (req, res) => {
    res.render("home", { user: user, auth, aproved })
})


//acessando o servidor na porta 1337
app.listen(1337, () => {
    console.log('Servidor em serviço.')
})