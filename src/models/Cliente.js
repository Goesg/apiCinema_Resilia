///Importando banco de dados////
const database = require("../infra/database");

///Criando model/tabela da entidade Cliente////
const cliente = database.Cinema.define("cliente", {
    nome: {
        type: database.Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: database.Sequelize.INTEGER,
        allowNull: false
    },
    cpf: {
        type: database.Sequelize.STRING,
        allowNull: false
    }
});

///Exportando tabela////
module.exports = cliente;

