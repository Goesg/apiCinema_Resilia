const express = require('express');
const router = express.Router();
router.get("/lanche", (req, res) => {
    res.send("rota lanchonete");
});

router.get("/lanche/:id", (req, res) => {
    let id = req.params.id;
    res.send(`lanche ${id}`);
});


module.exports = router;