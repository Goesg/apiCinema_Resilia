const router = require("sequelize").Router()

////rotas da entidade sala/////
////rota para listar todas as salas
router.get("/salas",(req,res)=>{
    res.send("salas")
})

////rota para listar uma sala pelo id
router.get("/sala/:id",(req,res)=>{
    res.send(`sala:${id}`)
})

////exportando as rotas da sala
module.exports = router