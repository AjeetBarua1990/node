const express = require('express');
const groupController = require('../controller/Group');
const router = express.Router();
const { createPermission} = groupController;

router.post('/createPermission',createPermission);


//Api has been created for Group

module.exports = router;