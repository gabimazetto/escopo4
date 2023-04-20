const { DataTypes } = require("sequelize");
const { connection } = require("./database");


const Pedido = connection.define("pedido", {
    // num = id
    cod: {
        type: DataTypes.STRING(6),
        allowNull: false,
        defaultValue: function () {
            let codigo = '';
            for (let i = 0; i < 6; i++) {
                codigo += Math.floor(Math.random() * 10);
            }
            return codigo;
        },
        unique: true
    },
    produto: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    valor: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    txEntrega: {
        type: DataTypes.STRING(10)
    },
    cliente: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
},
    {
        paranoid: true
    }
);


module.exports = Pedido;