const router = require("express").Router()
const Funcionario = require("../models/Funcionario");

////rota para listar todos os funcionarios
router.get("/funcionarios",(req,res)=>{
    Funcionario.findAll({raw:true}).then(dados => 
     dados != undefined ? res.json(dados): res.send(`Nenhum funcionário foi encontrado`).status(404)
    ).catch(e => res.sendStatus(400))
});

////rota para lista o funcionario pelo id
router.get("/funcionario/:id",(req,res)=>{
    let id = req.params.id
    
    if(isNaN(id)){
        res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(400)
    }else{
        Funcionario.findByPk(id).then(dado => {
            if(dado != undefined){
                res.json(dado)
            }else{
                res.send(`funcinário específico não encotrado`).status(404)
            }
        })
    }
});

////rota para adicionar um novo funcionarios
router.post("/funcionarios",(req,res)=>{
    let{nome,salario,turno,cargo} = req.body
        Funcionario.create({
            nome:nome,
            salario:salario,
            turno:turno,
            cargo:cargo,
        }).then(dados => {
            res.send(`novo funcionário adicionado com sucesso`).status(200)
        }).catch(e => 
            res.sendStatus(400))
});

////rota para atualizar um funcionario pelo is
router.patch("/funcionario/:id",(req,res)=>{
    let id = req.params.id
        if(isNaN(id)){
            res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(400)
        }else{
            Funcionario.findByPk(id).then(dado => {
                if(dados != undefined){
                    let {nome,salario,turno,cargo} = req.body
                    Funcionario.update({
                        nome:nome,
                        salario:salario,
                        cargo:cargo,
                        turno:turno,
                    },{where:{id:id}}).then(() => res.send(`funcionário alterado com sucesso!!!`).status(200))
                    .catch(e => res.send(`erro ao alterar o funcionário`).status(400))
                }else{
                    res.send(`funcinário específico não encotrado`).status(404)
                }
            })
        }
})

////rota para deletar um funcioario pelo id
router.delete("/funcionario/:id",(req,res)=>{
    let id = req.params.id 
        if(isNaN(id)){
            res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(400)
        }else{
            Funcionario.findByPk(id).then(dado => {
                if(dado!=undefined){
                    Funcionario.destroy({
                        where:{id:id}
                    }).then(()=>res.send(`funcionário deletado com sucesso !!!`).status(200))
                }else{
                    res.send(`funcinário específico não encotrado`).status(404)
                }
            })
        }
})

module.exports = router