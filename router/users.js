const express = require('express');
const userController = require('../controller/user');
const router = express.Router();
const { usersCreate,usersList,userlogin,usersUpdate} = userController;

router.post('/usersCreate',usersCreate);
router.post('/userlogin',userlogin);
router.post('/usersUpdate',usersUpdate);

router.get('/usersList',usersList);

//Api has been created for User

module.exports = router;