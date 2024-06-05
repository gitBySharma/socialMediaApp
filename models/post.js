const express = require("express");
const Sequelize = require("sequelize");

const sequelize = require('../util/database');

const Post = sequelize.define('posts',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    postLink:{
        type: Sequelize.STRING,
        allowNull: false
    },
    postDesc: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Post;