const database = require('../infra/database');

const lanche = database.Cinema.define("lanche", {
    nome: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: database.Sequelize.FLOAT,
        allowNull: false
    },
    data_validade: {
        type: database.Sequelize.STRING,
        allowNull: false
    }
});

lanche.sync({force: false})

module.exports = lanche;