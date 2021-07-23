const database = require("../infra/database")

const sala = database.Cinema.define("sala",{  
    tipo: {
        type: database.Sequelize.STRING,
        allowNull:false
    },
    fileiras: {
        type: database.Sequelize.INTEGER,
        allowNull:false
    },
    cadeiras: {
        type: database.Sequelize.INTEGER,
        allowNull:false
    },
})

module.exports = sala