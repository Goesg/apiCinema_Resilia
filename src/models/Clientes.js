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


////Criando Tabela////
// cliente.sync({force: true});  Só se executa esse comando UMA VEZ pra cada tabela guys... Cuidado!!!

///Exportando tabela////
module.exports = cliente;

