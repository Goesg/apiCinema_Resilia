const express = require("express");
const router = express.Router();
const Filme = require("../models/Filme")


////rota para listar todos os filmes
router.get("/filmes",(req,res)=>{
    Filme.findAll({raw:true}).then(dados => 
     dados != undefined ? res.json(dados): res.sendStatus(404)
    ).catch(e => res.sendStatus(400))
});

////rota para lista o filme pelo id
router.get("/filme/:id",(req,res)=>{
    let id = req.params.id
    
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        Filme.findByPk(id).then(dado => {
            if(dado != undefined){
                res.json(dado)
            }else{
                res.sendStatus(404)
            }
        })
    }
});

////rota para adicionar um novo filmes
router.post("/filmes",(req,res)=>{
    let {titulo,genero,classificacao,lancamento} = req.body
    Filme.create({
           titulo:titulo,
           genero:genero,
           classificacao:classificacao,
           lancamento:lancamento,
        }).then(dados => {
            res.sendStatus(200)
        }).catch(e => 
            res.sendStatus(400))
});

////rota para atualizar um filme pelo is
router.patch("/filme/:id",(req,res)=>{
    let id = req.params.id
        if(isNaN(id)){
            res.sendStatus(400)
        }else{
            Filme.findByPk(id).then(dado => {
                if(dado != undefined){
                    let {titulo,genero,classificacao,lancamento} = req.body
                    Filme.update({
                        titulo:titulo,
                        genero:genero,
                        classificacao:classificacao,
                        lancamento:lancamento,
                    },{where:{id:id}}).then(() => res.sendStatus(200))
                    .catch(e => res.sendStatus(400))
                }else{
                    res.sendStatus(404)
                }
            })
        }
})

////rota para deletar um filme pelo id
router.delete("/filme/:id",(req,res)=>{
    let id = req.params.id 
        if(isNaN(id)){
            res.sendStatus(400)
        }else{
            Filme.findByPk(id).then(dado => {
                if(dado!=undefined){
                    Filme.destroy({
                        where:{id:id}
                    }).then(()=> res.sendStatus(200))
                }else{
                    res.sendStatus(404)
                }
            })
        }
})

module.exports = router;