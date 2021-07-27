///importando express////
const express = require("express")
const app = express()

///importando body-parser////
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

///////sincronizando o banco de dados/////////
/////1° passo: importar os models
const Clientes = require("./models/Cliente");
const Filmes = require("./models/Filme");
const lanches = require("./models/Lanche");
const Salas = require("./models/Sala")
/////2° passo: sincronizar o banco de dados cinema
const cinema = require("./infra/database").Cinema.sync()
.then(() => console.log("Banco de dados pronto para uso!!!"))

///////rotas da api////////
////importando rotas da entidade cliente
const clientesController = require("./controller/clientesController")
app.use("/", clientesController);

////importando rotas da entidade lanche
const lancheController = require("./controller/lancheController");
app.use("/", lancheController);

////importando rotas da entidade filme
const filmesController = require("./controller/filmesController")
app.use("/",filmesController)

////importando rotas da entidade sala
const salaController = require("./controller/salaController")
////Definindo servidor////
app.use("/",salaController)

////////servidor///////
const port = process.env.PORT || 3000
app.listen(port,(e)=>{
    if(e){
        console.log(`erro ao inciar servidor:${port} => ${e}`)
    }else{
        console.log(`servidor inicializado com sucesso!!!`)
    }
})