////Importando express////
const express = require("express");
const Cliente = require("../models/Cliente");
const router = express.Router();
const Sequelize = require("sequelize");

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
    let id = req.params.id;
    if(isNaN(id)) {
<<<<<<< HEAD
        res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(404)
    }
    else {
        Cliente.findByPk(id).then(dado => {
            dado == undefined ? res.send(`cliente específico não encontrado`).status(404):res.json(dado).status(200)
=======
        res.send(`Cliente inválido!`).status(400)
    }
    else {
        Cliente.findByPk(id).then(dado => {
            dado == undefined ? res.send(`Cliente não encontrado!`).status(404):res.json(dado)
>>>>>>> b2d5a0bcd8c9ba71a5fa64e6286dfb4a5bf54847
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
<<<<<<< HEAD
        res.send(`novo cliente adicionado com sucesso`).status(200)
    }).catch(error => res.send(`erro ao adicionar um novo cliente`).status(400));
=======
        res.send(`Cliente inserido com sucesso!`).status(200);
    }).catch(error => res.send(`Cliente inválido!`).status(400));
>>>>>>> b2d5a0bcd8c9ba71a5fa64e6286dfb4a5bf54847
})

////rota para atualizar um cliente pelo id
router.patch("/cliente/:id", (req, res) => {
    let id = req.params.id
    if(isNaN(id)) {
<<<<<<< HEAD
        res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(400)
=======
        res.send(`Cliente inválido!`).status(400);
>>>>>>> b2d5a0bcd8c9ba71a5fa64e6286dfb4a5bf54847
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
<<<<<<< HEAD
                    res.send(`cliente alterado com sucesso!!!`).status(200)
                    .catch (error => res.send(`erro ao alterar o cliente`).status(400))
                })
            }
            else {
                res.send(`cliente específico não encontrado`).status(404)
=======
                    res.send(`Dados alterados com sucesso!`).status(200)
                    .catch (error => res.send(`Não foi possível alterar!`).status(400))
                })
            }
            else {
                res.send(`Não foi possível alterar!`).status(404)
>>>>>>> b2d5a0bcd8c9ba71a5fa64e6286dfb4a5bf54847
            }
        })
    }
})

///rota para apagar um cliente pelo id
router.delete("/cliente/:id", (req, res) => {
    let id = req.params.id;
    if(isNaN(id)) {
<<<<<<< HEAD
        res.send(`parâmetro da requisição inválido, ulitilize apenas números`).status(400)
=======
        res.send(`Cliente inválido!`).status(400);
>>>>>>> b2d5a0bcd8c9ba71a5fa64e6286dfb4a5bf54847
    }
    else {
        Cliente.findByPk(id).then((dado) => {
            if(dado != undefined) {
                Cliente.destroy({
                    where:{id:id}
                }).then(()=> res.send(`Cliente deletado com sucesso!`).status(200))
            }
            else {
<<<<<<< HEAD
                res.send(`clinte específico não encontrado`).status(404)
=======
                res.send(`Não foi possível deletar!`).status(404);
>>>>>>> b2d5a0bcd8c9ba71a5fa64e6286dfb4a5bf54847
            }
        })
    }
}) 

module.exports = router;