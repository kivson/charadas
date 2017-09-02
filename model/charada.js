const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    // SQLite only
    storage: './database.sqlite'
});

const Charada = sequelize.define('charada', {
    pergunta: {
        type: Sequelize.STRING
    },
    resposta: {
        type: Sequelize.STRING
    }
});

Charada.sync();



exports.Charada = Charada;