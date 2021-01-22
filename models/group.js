var mongoose = require('mongoose');
var activity = require('../models/activity.js').schema;
var assingeduser = require('../models/assingeduser.js').schema;
var Schema = mongoose.Schema;

if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'),{ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex: true});
}

var newSchema = new Schema();
newSchema.add({
  "groupName": { type: String},
   "description": { type: String},
   "createdAt": { type: String},
   "createdBy": { type: String},
   "updatedBy": { type: String},
   "isactive": { type: String, default:'true'},
   "updatedAt": { type: String},
   "roles":[activity],
   "assignedUser":[assingeduser]
})



newSchema.pre('save', function(next){
    this.createdAt = Date.now();
    next();
    
  });
  
  newSchema.pre('update', function() {
    this.updatedAt({}, { $set: { updatedAt: Date.now() } });
  });
  
  newSchema.pre('findOneAndUpdate', function() {
    this.updatedAt({}, { $set: { updatedAt: Date.now() } });
  });

  module.exports = mongoose.model('group', newSchema);