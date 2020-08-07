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
    prop: {
        type: Sequelize.DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // options
});


sequelize.sync()
//{ force: true }

module.exports = {
    SettingsDrive
}