const config= require('./config')
const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = new Sequelize(config['development']);