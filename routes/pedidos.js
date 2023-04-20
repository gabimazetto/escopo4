const { Router } = require("express");
const Pedido = require("../database/pedido");
const Entregador = require("../database/entregador");

const router = Router();

// ADICIONAR PEDIDOS
router.post("/pedidos", async (req, res) =>{
    const { produto, valor, status, txEntrega, cliente, endereco } = req.body;

    try {
        const novo = await Pedido.create({ produto, valor, status, txEntrega, cliente, endereco });
        res.status(201).json(novo);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu!", err });
    }
});

// CONSULTAR PEDIDOS
router.get("/pedidos", async (req, res) =>{
    const lista = await Pedido.findAll();
    res.json(lista);
});

// CONSULTAR PEDIDOS POR ID
router.get("/pedidos/:id", async (req, res) => {
    const pedido = await Pedido.findOne({
        where: { id: req.params.id }
    });
    try {
        if(pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ message: "Pedido não encontrado" });
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "Um erro acontece, tente de novo" });
    }
});

// EDITAR PEDIDO
router.put("/pedidos/:id", async (req, res) => {
    const { produto, valor, status, txEntrega, endereco, entregadorId } = req.body;
    
    const pedido = await Pedido.findByPk(req.params.id);
    try {
        if(pedido) {
            await pedido.update(
                { produto, valor, status, txEntrega, endereco, entregadorId }, 
                { where: {id: req.params.id}}
            );
                res.json({ message: "Pedido atualizaco com sucesso." });
        } else {
            res.status(404).json({ message: "Pedido não encontrado."});
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "Um erro aconteceu."});

    }
});

// EXCLUIR UM PEDIDO
router.delete("/pedidos/:id", async (req, res) => {
    const pedido = await Pedido.findByPk(req.params.id);

    try {
        if(pedido) {
            await pedido.destroy({ force: false });
            res.status(200).json({ messagem: "Pedido removido com sucesso" });
        } else {
            res.status(404).json({ message: "Pedido não encontrado" });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu, tente de novo" });
    }
});





module.exports = router;