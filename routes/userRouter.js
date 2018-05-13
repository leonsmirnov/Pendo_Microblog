var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');



router.get('/', userController.getUsers);
router.get('/:userName', userController.getUserByUserName);

router.post('/', userController.postUser);










module.exports = router;