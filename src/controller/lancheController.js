const router = require("express").Router()
const Lanche = require("../models/Lanche");

////rota para listar todos os lanches
router.get("/lanches",(req,res)=>{
    Lanche.findAll({raw:true}).then(dados => 
     dados != undefined ? res.json(dados): res.send(`Nenhum lanche foi encontrado`).status(404)
    ).catch(e => res.sendStatus(400))
});

////rota para lista o lanche pelo id
router.get("/lanche/:id",(req,res)=>{
    let id = req.params.id
    
    if(isNaN(id)){
        res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(400)
    }else{
        Lanche.findByPk(id).then(dado => {
            if(dado != undefined){
                res.json(dado)
            }else{
                res.send(`lanche específico não encontrado`).status(404)
            }
        })
    }
});

////rota para adicionar um novo funcionarios
router.post("/lanches",(req,res)=>{
    let{nome,preco,data_validade} = req.body
    Lanche.create({
            nome:nome,
            preco:preco,
            data_validade:data_validade,
        }).then(dados => {
            res.send(`novo lanche adicionado com sucesso`).status(200)
        }).catch(e => 
            res.send(`erro ao adicionar um novo lanche`).status(400))
});

////rota para atualizar um funcionario pelo is
router.patch("/lanche/:id",(req,res)=>{
    let id = req.params.id
        if(isNaN(id)){
            res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(400)
        }else{
            Lanche.findByPk(id).then(dado => {
                if(dados != undefined){
                    let {nome,preco,data_validade} = req.body
                    Lanche.update({
                        nome:nome,
                        preco:preco,
                        data_validade:data_validade,
                    },{where:{id:id}}).then(() => res.send(`lanche alterado com sucesso!!!`).status(200))
                    .catch(e => res.send(`erro ao alterar o funcionário`).status(400))
                }else{
                    res.send(`lanche específico não encontrado`).status(404)
                }
            })
        }
})

////rota para deletar um funcioario pelo id
router.delete("/lanche/:id",(req,res)=>{
    let id = req.params.id 
        if(isNaN(id)){
            res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(400)
        }else{
            Lanche.findByPk(id).then(dado => {
                if(dado!=undefined){
                    Lanche.destroy({
                        where:{id:id}
                    }).then(()=> res.send(`lanche deletado com sucesso!!!`))
                }else{
                    res.send(`lanche específico não encontrado`).status(404)
                }
            })
        }
})

module.exports = router;