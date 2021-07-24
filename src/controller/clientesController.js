////Importando express////
const express = require("express");
const Cliente = require("../models/Cliente");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

////rotas da entidade clientes/////
////rota para listar todas os clientes
router.get("/clientes", (req, res) => {
    Cliente.findAll({raw: true}).then(dados => {
        if(dados!=undefined) {
            res.json(dados);
        }
        else {
            res.sendStatus(404);
        }
    })
})


////rota para listar uma cliente pelo id
router.get("/cliente/:id", (req, res) => {
    let id = req.params.id;
    if(isNaN(id)) {
        res.sendStatus(403)
    }
    else {
        Cliente.findByPk(id).then(dado => {
            dado == undefined ? res.sendStatus(402):res.json(dado)
        })
    }
})

router.post("/clientes", (req, res) => {
    ////inserindo dados na tabela////
    ///1° passo: pegar os dados do body
    let{nome, idade, cpf} = req.body;
    ///2° passo: usar o metodo create
    Cliente.create({
        nome:nome,
        idade:idade,
        cpf:cpf
    }).then(() => {
        res.sendstatus(200);
    }).catch(error => res.sendStatus(error));
})
////////////
//////
////rota para atualizar um cliente pelo id
router.patch("/cliente/:id", (req, res) => {
    let id = req.params.id
    if(isNaN(id)) {
        res.sendStatus(400);
    }
    else {
        Cliente.findByPk(id).then(dado => {
            if(dado != undefined) {
                let{nome, idade, cpf} = req.body;
                ////usando método update para atualizar um dado específico da tabela Clientes
                Cliente.update({
                    nome:nome,
                    idade:idade,
                    cpf:cpf
                }, {where:{id:id}}).then(() => {
                    res.send(`Dados alterados com sucesso!`).status(200)
                    .catch (error => res.send(error).status(400))
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
        res.sendStatus(400);
    }
    else {
        Cliente.findByPk(id).then((dado) => {
            if(dado != undefined) {
                Cliente.destroy({
                    where:{id:id}
                }).then(()=> res.send(`Cliente deletado com sucesso!`))
            }
            else {
                res.sendStatus(404);
            }
        })
    }
}) 

module.exports = router;