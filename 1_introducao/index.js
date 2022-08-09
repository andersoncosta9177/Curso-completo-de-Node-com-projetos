// console.log("Helo world Node!")

const fs = require("fs") //file sistem

fs.readFile("archive.txt", 'utf8', (err, data)=>{
    if(err){
        console.log(err)
        console.log("Arquivo nao existe")
    }
    console.log(data)
})
