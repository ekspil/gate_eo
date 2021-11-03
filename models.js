const sequelize = require('./sql.js')
const Sequelize = require('sequelize')


const SettingsDrive = sequelize.define('settings_drive', {
    // attributes
    id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.DataTypes.INTEGER
        // allowNull defaults to true
    },
    ip: {
        type: Sequelize.DataTypes.STRING
        // allowNull defaults to true
    },
    address: {
        type: Sequelize.DataTypes.STRING
    },
    prop: {
        type: Sequelize.DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // options
});


sequelize.sync({alter: true})
//{ force: true }

module.exports = {
    SettingsDrive
}