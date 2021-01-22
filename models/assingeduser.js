var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}
var assigneduser = new Schema();

assigneduser.add({
    "id": { type: String},
    "email": {type: String}
}
);

module.exports = mongoose.model('assigneduser', assigneduser);