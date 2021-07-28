const router = require("express").Router()
////importar a tabela sala
const Sala = require("../models/Sala")

////rotas da entidade sala/////
////rota para listar todas as salas
router.get("/salas",(req,res)=>{
    Sala.findAll({raw:true}).then(dados=>{
        if(dados!=undefined){
            res.json(dados).status(200)
        }else{
            res.sendStatus(404)
        }
    }).catch(e => res.sendStatus(400))
})

////rota para listar uma sala pelo id
router.get("/sala/:id",(req,res)=>{
    let id = req.params.id
        if(isNaN(id)){
            res.sendStatus(400)
        }else{
            Sala.findByPk(id).then(dado => {
                dado == undefined ? res.sendStatus(404):res.json(dado).status(200)
            }).catch(e => res.sendStatus(400))
        }
})

router.post("/salas",(req,res)=>{
    let{tipo,fileiras,cadeiras}=req.body;
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

