const fs = require('fs');




// removendo arquivo txt
//  fs.unlink('arquivo.txt', function(err){
//      if(err){
//         console.log(err) 
//     }
//     console.log('arquivo removido')
//  })
const arquivo = 'arquivo.txt'
const newArquivo = 'new.txt'
fs.rename( arquivo, newArquivo, function(err){
    if(err){
       console.log(err) 
    }

    console.log("arquivo renomeado")
})