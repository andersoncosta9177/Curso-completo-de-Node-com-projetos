const express = require("express")
const app = express()
const users = require('./users')
const path = require("path")
app.use('/users', users)

app.use(express.static('public'))

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())


const basePath = path.join(__dirname, 'templates')

app.use('users', users)

app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})



app.use(function(req,res,next){
    res.status(404).sendFile(`${basePath}/404.html`)
})




app.listen(1337, () => {
    console.log("=================")
    console.log('servidor startando🎆')
    console.log("=================")
})