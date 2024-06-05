const express = require("express");
const Sequelize = require("sequelize");

const sequelize = require('../util/database');

const Comment = sequelize.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    comment: {
        type: Sequelize.STRING,
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'posts', // Referenced the 'posts' table
            key: 'id'
        }
    }
});

module.exports = Comment;