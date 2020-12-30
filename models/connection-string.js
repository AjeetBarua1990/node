// place connection string here
//var uri = 'mongodb+srv://sonusaini:sonu1234@cluster0-xpavi.mongodb.net/test?retryWrites=true&w=majority';
// or   var uri = 'mongodb://andy:corn@localhost:27017/cli';
// or   var uri = config.get('mongo');
// or   var uri = process.env.MONGO_URL

//const config = require('../../common/config.json');

var url = require('url')
const db_username = encodeURIComponent("ec2-user") 
const db_pasword = encodeURIComponent("")
var uri = 'mongodb://100.24.60.117:27017/MeanProject';
//var uri = 'mongodb://'+db_username+':'+db_pasword+'@172.29.5.193:27017,172.29.5.194:27017,172.29.5.195:27017/Humonoid?replicaSet=dbcbt-repcl'; // Prod multiple connection


// var url = require('url')
// const db_username = encodeURIComponent("HumonoidReportAdmin") 
// const db_pasword = encodeURIComponent("Humonoid#Report#Admin#234")
// var uri = 'mongodb://'+db_username+':'+db_pasword+'@172.29.8.132:27017/HumonoidReport';

//var uri = 'mongodb://localhost:27017/humanoid';
if (!uri) {
  throw new Error(
    '\033[31mYou need to provide the connection string. ' +
    'You can open "models/connection-string.js" and export it or use the "setUri" command.\033[0m'
  );
}

var uriObj = url.parse(uri)
if (uriObj.protocol !== 'mongodb:') {
  throw new Error('Must be a mongodb URI')
}
if (!uriObj.host || !uriObj.path) {
  throw new Error('Improperly formatted URI')
}
module.exports = uri;

