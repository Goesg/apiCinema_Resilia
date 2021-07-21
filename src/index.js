///importando express////
const express = require("express")
const app = express()

///importando body-parser////
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

///////rotas da api////////
////importando rotas da entidade cliente
const clientesController = require("./controller/clientesController")
app.use("/", clientesController);

////importando rotas da entidade lanche
const lancheController = require("./controller/lancheController");
app.use("/", lancheController);

////importando rotas da entidade filme
const filmeController = require("./controller/filmeController")
app.use("/",filmeController)

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