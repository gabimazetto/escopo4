const { Op } = require("sequelize");

const { Router } = require("express");
const Pedido = require("../database/pedido");
const Entregador = require("../database/entregador");

const router = Router();

// FILTRAGEM NOME ENTREGADORES // http://localhost:3000/entregadores/nome?nome=Jessica
router.get('/entregadores/nome', async (req, res) => {
    const { nome } = req.query; 
    const where = nome ? { nome: { [Op.like]: `%${nome}%` } } : {}; 
    try {
        const entregadores = await Entregador.findAll({ where }); 
        res.json(entregadores);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao listar entregadores.' });
    }
});

// FILTRAGEM PLACA ENTREGADORES
router.get('/entregadores/placa', async (req, res) => {
    const { placa } = req.query; 
    const where = placa ? { placa: { [Op.like]: `%${placa}%` } } : {}; 
    try {
        const entregadores = await Entregador.findAll({ where }); 
        res.json(entregadores);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao listar entregadores.' });
    }
});


// FILTRAR PEDIDO PELO CODIGO
router.get('/pedido/cod', async (req, res) => {
    const { cod } = req.query; 
    const where = cod ? { cod: { [Op.like]: `%${cod}%` } } : {}; 
    try {
        const entregadores = await Pedido.findAll({ where }); 
        res.json(entregadores);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao listar entregadores.' });
    }
});






module.exports = router;