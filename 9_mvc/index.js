const express = require("express")
const app = express();
const { engine } = require('express-handlebars')
const conn = require("./db/conn")
const tasksRoutes = require("./routes/tasksRoutes")

//template engine
app.engine("handlebars", engine())
app.set('view engine', 'handlebars')


//importando os models
const Task = require("./models/Task")


//arquivos estaticos
app.use(express.static('public'))
app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))


app.use('/tasks', tasksRoutes)


conn
.sync()
.then( ()=> {
    app.listen(1337)
    console.log('Ok, tudo certo por aqui')
})
.catch( (err)=> console.log(err))

