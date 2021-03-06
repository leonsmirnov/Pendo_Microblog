var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');


router.get('/', postController.getPosts);
router.get('/top', postController.getTopPosts);
router.post('/', postController.postPost);
router.put('/update/:postId', postController.updatePost);
router.put('/upvote/post/:postId/user/:username', postController.upVote);
router.put('/downvote/post/:postId/user/:username', postController.downVote);

module.exports = router;