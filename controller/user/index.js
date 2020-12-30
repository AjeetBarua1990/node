var mongoose = require('mongoose');
var utils = require('../../common/utils.js');
var config = require('../../common/config.json');
const apistatus = require('../../common/apistatus.json');
const apiresponse = require('../../common/apiresponse.json');
const model = require('../../models/all-models');
const jwt = require('jsonwebtoken');
const SECRET_KEY = config.SECRET_KEY;

module.exports = {
    usersCreate,usersList
}

async function usersList(req, res, next) {
    let responseObj = {};
    let requestObj = req.body;

        try {

        const data = await model.users.find({});

        responseObj.userData = data;
        responseObj.message = apiresponse.Success;
        responseObj.status = apistatus.Created;
        res.send(responseObj);
        }catch (error){ 
            responseObj.message = apiresponse.SomethingWentWrong
            responseObj.status = apistatus.conflict
            responseObj.error = error;
            res.send(responseObj);
        }
}

async function usersCreate(req, res, next) {
    let responseObj = {};
    let requestObj = req.body;

    let email=requestObj.userEmail;
    let userName=requestObj.userName;

    var user_email = await findEmail(requestObj.userEmail);
    if (user_email != "null") {
        responseObj.message = apiresponse.UserAlreddayAvailable;
        responseObj.status = apistatus.ok
        res.send(responseObj);
    }else{
        try {
        const data = await model.users.create(requestObj);
        responseObj.id = data.id;
        responseObj.message = apiresponse.UserCreated;
        responseObj.status = apistatus.Created;
        res.send(responseObj);
        }catch (error){ 
            responseObj.message = apiresponse.WrongInput
            responseObj.status = apistatus.conflict
            responseObj.error = error;
            res.send(responseObj);
        }
    }
}

async function findEmail(email) {
    let user_email = email;
    try {
        const data = await model.users.find({ userEmail: user_email });
        if (data.length > 0) {
        return data[0].email
            } else {
               return "null";

        }
    } catch (error) {
        return "null";

    }

}