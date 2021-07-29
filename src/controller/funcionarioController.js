const router = require("express").Router()
const Funcionario = require("../models/Funcionario");

////rota para listar todos os funcionarios
router.get("/funcionarios",(req,res)=>{
    Funcionario.findAll({raw:true}).then(dados => 
     dados != undefined ? res.json(dados): res.sendStatus(404)
    ).catch(e => res.sendStatus(400))
});

////rota para lista o funcionario pelo id
router.get("/funcionario/:id",(req,res)=>{
    let id = req.params.id
    
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        Funcionario.findByPk(id).then(dado => {
            if(dado != undefined){
                res.json(dado)
            }else{
                res.sendStatus(404)
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
            res.sendStatus(200)
        }).catch(e => 
            res.sendStatus(400))
});

////rota para atualizar um funcionario pelo id
router.patch("/funcionario/:id",(req,res)=>{
    let id = req.params.id
        if(isNaN(id)){
            res.sendStatus(400)
        }else{
            Funcionario.findByPk(id).then(dado => {
                if(dado != undefined){
                    let {nome,salario,turno,cargo} = req.body
                    Funcionario.update({
                        nome:nome,
                        salario:salario,
                        cargo:cargo,
                        turno:turno,
                    },{where:{id:id}}).then(() => res.sendStatus(200))
                    .catch(e => res.sendStatus(400))
                }else{
                    res.sendStatus(404)
                }
            })
        }
})

////rota para deletar um funcioario pelo id
router.delete("/funcionario/:id",(req,res)=>{
    let id = req.params.id 
        if(isNaN(id)){
            res.sendStatus(400)
        }else{
            Funcionario.findByPk(id).then(dado => {
                if(dado!=undefined){
                    Funcionario.destroy({
                        where:{id:id}
                    }).then(()=>res.sendStatus(200))
                }else{
                    res.sendSatus(404)
                }
            })
        }
})

module.exports = router