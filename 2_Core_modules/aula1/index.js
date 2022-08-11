const http = require("http");
const port = 1337;
cost url = require(url)

const server = http.createServer((req, res) => {
    const urlInfo = require("url").parse(req.url, true)
    const name = urlInfo.query.name

    res.statusCode = 200
    res.setHeader('Content-type', 'text/html')

    if(!name){
        res.end("<h1>Preencha seu nome</h1>")
    }else{
        res.end("Seja bem vindo ")
    }
})











server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
}) 