const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Pedido = require("./pedido");

const Entregador = connection.define("entregador", {
    nome: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
},
    {// passar paranoid como parâmetro
    paranoid: true
    }
);


Entregador.hasMany(Pedido, {onDelete: "CASCADE"});
Pedido.belongsTo(Entregador);

module.exports = Entregador;