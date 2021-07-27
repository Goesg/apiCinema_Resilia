const express = require("express");
const router = express.Router();
const Filme = require("../models/Filme")


////rota para listar todos os filmes
router.get("/filmes",(req,res)=>{
    Filme.findAll({raw:true}).then(dados => 
     dados != undefined ? res.json(dados): res.send(`Nenhum filme foi encontrado`).status(404)
    ).catch(e => res.sendStatus(400))
});

////rota para lista o filme pelo id
router.get("/filme/:id",(req,res)=>{
    let id = req.params.id
    
    if(isNaN(id)){
        res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(400)
    }else{
        Filme.findByPk(id).then(dado => {
            if(dado != undefined){
                res.json(dado)
            }else{
                res.send(`filme específico não encontrado`).status(404)
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
            res.send(`novo filme adicionado com sucesso`).status(200)
        }).catch(e => 
            res.send(`erro ao adicionar um novo filme`).status(400))
});

////rota para atualizar um filme pelo is
router.patch("/filme/:id",(req,res)=>{
    let id = req.params.id
        if(isNaN(id)){
            res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(400)
        }else{
            Filme.findByPk(id).then(dado => {
                if(dado != undefined){
                    let {titulo,genero,classificacao,lancamento} = req.body
                    Filme.update({
                        titulo:titulo,
                        genero:genero,
                        classificacao:classificacao,
                        lancamento:lancamento,
                    },{where:{id:id}}).then(() => res.send(`filme alterado com sucesso!!!`).status(200))
                    .catch(e => res.send(`erro ao alterar o filme`).status(400))
                }else{
                    res.send(`filme específico não encontrado`).status(404)
                }
            })
        }
})

////rota para deletar um filme pelo id
router.delete("/filme/:id",(req,res)=>{
    let id = req.params.id 
        if(isNaN(id)){
            res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(400)
        }else{
            Filme.findByPk(id).then(dado => {
                if(dado!=undefined){
                    Filme.destroy({
                        where:{id:id}
                    }).then(()=> res.send(`filme deletado com sucesso!!!`))
                }else{
                    res.send(`filme específico não encontrado`).status(404)
                }
            })
        }
})

module.exports = router;