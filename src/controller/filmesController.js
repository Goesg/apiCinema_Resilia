const express = require("express");
const router = express.Router();

router.get("/filmes", (req,res) =>{
    res.send("filmes")
})

router.get("/filmes/:id", (req,res)=>{
    let id =req.params.id
    res.send(`titulo do filme:${id}`)
})

module.exports = router;