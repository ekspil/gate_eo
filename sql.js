const Sequelize = require('sequelize');
const sequelize = new Sequelize("gate_eo", "postgres", "postgres", {
    host: "localhost",
    port: 5432,
    dialect: 'postgres',
    logging: false
});


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize