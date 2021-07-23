const database = require("../infra/database");
const filme = database.Cinema.define("filme", {
    titulo: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    genero: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    classificacao: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    lancamento: {
        type: database.Sequelize.STRING,
        allowNull: false
    }
});

module.exports = filme;