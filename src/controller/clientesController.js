////Importando express////
const express = require("express");
const Cliente = require("../models/Cliente");
const router = express.Router();

////rotas da entidade clientes/////
////rota para listar todas os clientes
router.get("/clientes", (req, res) => {
    Cliente.findAll({raw: true}).then(dados => {
        if(dados!=undefined) {
            res.json(dados).status(200);
        }
        else {
            res.sendStatus(404);
        }
    })
})

////rota para listar uma cliente pelo id
router.get("/cliente/:id", (req, res) => {
    let id = req.params.id
    if(isNaN(id)) {
        res.sendStatus(404)
    }
    else {
        Cliente.findByPk(id).then(dado => {
            dado == undefined ? res.sendStatus(404):res.json(dado).status(200)
        })
    }
})

////rota para inserir clientes
router.post("/clientes", (req, res) => {
    let{nome, idade, cpf} = req.body;
    Cliente.create({
        nome:nome,
        idade:idade,
        cpf:cpf
    }).then(() => {
        res.sendStatus(200)
    }).catch(error => res.sendStatus(400));
})

////rota para atualizar um cliente pelo id
router.patch("/cliente/:id", (req, res) => {
    let id = req.params.id
    if(isNaN(id)) {
        res.sendStatus(400)
    }
    else {
        Cliente.findByPk(id).then(dado => {
            if(dado != undefined) {
                let{nome, idade, cpf} = req.body;
                Cliente.update({
                    nome:nome,
                    idade:idade,
                    cpf:cpf
                }, {where:{id:id}}).then(() => {
                    res.sendStatus(200)
                    .catch (error => res.sendStatus(400))
                })
            }
            else {
                res.sendStatus(404)
            }
        })
    }
})

///rota para apagar um cliente pelo id
router.delete("/cliente/:id", (req, res) => {
    let id = req.params.id;
    if(isNaN(id)) {
        res.sendStatus(400)
    }
    else {
        Cliente.findByPk(id).then((dado) => {
            if(dado != undefined) {
                Cliente.destroy({
                    where:{id:id}
                }).then(()=> res.sendStatus(200))
            }
            else {
                res.sendStatus(404)
            }
        })
    }
}) 

module.exports = router;