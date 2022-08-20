const {Sequelize} = require("sequelize")


const sequelize = new Sequelize('nodemvc', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',

})


try {
   sequelize.authenticate()
   console.log('conectamos ao sequelize')
    
} catch (error) {
    console.log(error)
    
}


module.exports = sequelize