const Sequelize = require("sequelize");

const sequelize = new Sequelize("socialmedia-app", "root", "Sharma@mysql1133", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;