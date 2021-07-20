////importar o router
const express = require("express")
const router = express.Router()

////rotas da entidade sala////
////rota para listar todas as salas
router.get("/salas",(req,res)=>{
    res.send("minhas salas")
})

///rota para listar a sala pelo id
router.get("/sala/:id",(req,res)=>{
    let id = req.params.id
    res.send(`vc escolheu a sala N°:${id}`)
})


////exportar as minhas rotas
module.exports = router


