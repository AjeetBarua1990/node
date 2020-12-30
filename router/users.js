const express = require('express');
const userController = require('../controller/User');
const router = express.Router();
const { usersCreate,usersList,userlogin,usersUpdate} = userController;

router.post('/usersCreate',usersCreate);
router.post('/userlogin',userlogin);
router.post('/usersUpdate',usersUpdate);

router.get('/usersList',usersList);

module.exports = router;