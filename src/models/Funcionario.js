const database = require('../infra/database');

const lanche = database.Cinema.define("funcionario", {
    nome: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    salario: {
        type: database.Sequelize.FLOAT,
        allowNull: false
    },
    turno: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    cargo: {
        type: database.Sequelize.STRING,
        allowNull: false
    }
});

module.exports = lanche;