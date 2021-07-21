////Importando express////
const express = require("express");
const router = express.Router();

router.get("/clientes", (req, res) => {
    res.send("Você está na rota de clientes")
})

router.get("/clientes/:id", (req, res) => {
    let id = req.params.id;
    res.send(`Cliente ${id}`);
})

module.exports = router;