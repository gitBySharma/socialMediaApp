const Post = require('../models/post');
const Comment = require('../models/comment');


exports.postNewPost = async (req, res, next) => {
    const { postLink, postDesc } = req.body;
    try {
        const data = await Post.create({
            postLink: postLink,
            postDesc: postDesc
        });
        res.status(200).json({ postData: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}


exports.getNewPost = async (req, res, next) => {
    try {
        const data = await Post.findAll();

        if (data) {
            res.status(200).json({ postData: data });
        } else {
            res.status(400).json({ error: "No posts found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Unable to fetch data" });
    }
}


exports.postComments = async (req, res, next) => {
    try {
        const { comment, postId } = req.body;
        const data = await Comment.create({
            comment: comment,
            postId: postId
        });
        res.status(200).json({ commentData: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.getComments = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const data = await Comment.findAll({
            where:{postId: postId}
        });

        if (data) {
            res.status(200).json({ commentData: data });
        } else {
            res.status(400).json({ error: "No comments found" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}