const express = require('express');
const userController = require('../controller/user');
const router = express.Router();
const { usersCreate,usersList} = userController;

router.post('/usersCreate',usersCreate);
router.get('/usersList',usersList);

module.exports = router;