const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");

const sequelize = require('./util/database');
const Post = require('./models/post.js');
const Comment = require('./models/comment.js');
const Controller = require('./controller/socialMedia');

const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/', Controller.postNewPost);

app.get('/', Controller.getNewPost);

app.post('/comments', Controller.postComments);

app.get('/comments/:postId', Controller.getComments);


Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });


sequelize.sync()
    .then((result) => {
        app.listen(3000);
    }).catch((err) => {
        console.log(err);
    });