const { Sequelize } = require('sequelize');
const db = new Sequelize('inventario', 'developer', 'Knucklesfj123', {
    host: '192.168.2.115',
    dialect: 'mysql',
    // logging:false
}); // Example for sqlite

module.exports = db;