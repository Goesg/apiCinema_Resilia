const router = require("express").Router()
////importar a tabela sala
const Sala = require("../models/Sala")
////importar o operador do sequelize
const Sequelize = require("sequelize")
const Op = Sequelize.Op

////rotas da entidade sala/////
////rota para listar todas as salas
router.get("/salas",(req,res)=>{
    Sala.findAll({raw:true}).then(dados=>{
        if(dados!=undefined){
            res.json(dados)
        }else{
            res.sendStatus(402)
        }
    })
})

////rota para listar uma sala pelo id
router.get("/sala/:id",(req,res)=>{
    let id = req.params.id
        if(isNaN(id)){
            res.sendStatus(403)
        }else{
            Sala.findByPk(id).then(dado => {
                dado == undefined ? res.sendStatus(402):res.json(dado)
            })
        }
})

router.post("/salas",(req,res)=>{
    ///inserindo dados na tabela///
    ///1° passo: pegar os dados do body
    let{tipo,fileiras,cadeiras}=req.body;
    ///2° passo: usar o metodo create 
        Sala.create({
            tipo: tipo,
            fileiras:fileiras,
            cadeiras:cadeiras
        }).then(()=>
            res.sendStatus(200)
        ).catch(e => res.sendStatus(400))
})

////rota para atualizar uma sala pelo id
router.patch("/sala/:id",(req,res)=>{
    let id = req.params.id
        if(isNaN(id)){
            res.sendStatus(400)
        }else{
            Sala.findByPk(id).then(dado => {
                if(dado != undefined){
                    let {tipo,fileiras,cadeiras} = req.body
                    Sala.update({
                        tipo: tipo,
                        fileiras:fileiras,
                        cadeiras:cadeiras
                    },{where:{id:id}}).then(()=>res.sendStatus(200))
                    .catch(e => res.sendStatus(400))
                }else{
                    res.sendStatus(404)
                }
            })
        }
})

///rota para apagar uma sala pelo id
router.delete("/sala/:id",(req,res)=>{
    let id = req.params.id
        if(isNaN(id)){
            res.sendStatus(400)
        }else{
            Sala.findByPk(id).then((dado)=>{
                if(dado != undefined){
                    Sala.destroy({
                        where:{id:id}
                    }).then(()=>res.sendStatus(200))
                    .catch(e => res.sendStatus(400))
                }else{
                    res.sendStatus(404)
                }
            })
        }
})

////exportando as rotas da sala
module.exports = router

