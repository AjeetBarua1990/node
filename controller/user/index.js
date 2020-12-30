var mongoose = require('mongoose');
var utils = require('../../common/utils.js');
var config = require('../../common/config.json');
const apistatus = require('../../common/apistatus.json');
const apiresponse = require('../../common/apiresponse.json');
const model = require('../../models/all-models');
const jwt = require('jsonwebtoken');
const SECRET_KEY = config.SECRET_KEY;

module.exports = {
    usersCreate,usersList,userlogin,usersUpdate
}

async function userlogin(req, res, next) {
    let responseObj = {};
    let requestObj = req.body;

    let email=requestObj.userEmail;
    let password=requestObj.password;

    try{ 
        const data = await model.users.find({ userEmail: email, password: password});
    if (data.length > 0) {
        responseObj.message = apiresponse.Success;
        responseObj.userData = data[0];
        responseObj.status = apistatus.ok
        res.send(responseObj);
    }else{
        
        responseObj.message = apiresponse.InvalidCredentials;
        responseObj.status = apistatus.Bad_Request;
        res.send(responseObj);
        
    }
  }catch (error){
    responseObj.message = apiresponse.SomethingWentWrong;
    responseObj.status = apistatus.Bad_Request;
    res.send(responseObj);
 }
   
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

async function usersUpdate(req, res, next) {
    let responseObj = {};
    let requestObj = req.body;

    let email = requestObj.userEmail;
    let userName = requestObj.userName;
    let docID = requestObj.userID;

    var user_email = await findEmail(requestObj.userEmail);
    const data = await model.users.find({ "_id": docID});
    if (data.length > 0) {

        try {
        const data = await model.users.updateOne({ "_id": docID }, { $set: requestObj});
        responseObj.message = apiresponse.UserDataUpdated;
        responseObj.status = apistatus.ok
        res.send(responseObj);
        }catch (error){
            responseObj.message = apiresponse.WrongInput
            responseObj.status = apistatus.conflict
            responseObj.error = error;
            res.send(responseObj);
        }
    }else{
       
        responseObj.message = apiresponse.UserNotFound;
        responseObj.status = apistatus.conflict;
        res.send(responseObj);
        
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