////Importando Sequelize///
const Sequelize = require("sequelize");

////Criando banco de dados com o sequelize////
const Cinema = new Sequelize("Cinema", "admin", "senha", {
    host: "../infra/Cinema.sqlite",
    dialect: "sqlite"
})

////Conferindo conexão///
Cinema.authenticate()
.then(() => {
    console.log("database conectado com sucesso");
})
.catch(() => {
    console.log("erro ao conectar com database");
})

////Exportando banco de dados////
module.exports = {
    Sequelize: Sequelize,
    Cinema: Cinema
}