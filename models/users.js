var mongoose = require('mongoose');
var Schema = mongoose.Schema;

if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'),{ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex: true});
}

// mongoose.connect('mongodb://100.24.60.117:27017/MeanProject', function(err){
//     if(err){
//         console.log('database not connected');
//     }else{
//       console.log('database connected');
//     }
// });

var newSchema = new Schema();
newSchema.add({
   "userEmail": { type: String,required:true,unique:true},
   "userName": { type: String},
   "password": { type: String},
   "createdAt": { type: Date , default: Date.now },
   "updatedAt": { type: Date , default: Date.now },
   "status": { type: Boolean , default:true},
   "userFirstName": { type: String},
   "userlastName": { type: String},
   "InactiveReason": { type: String},
   "userRole": { type: String}
})


newSchema.pre('save', function(next){
    this.createdAt = Date.now();
    next();
    
  });
  
  newSchema.pre('update', function() {
    this.update({}, { $set: { updatedAt: Date.now() } });
  });
  
  newSchema.pre('findOneAndUpdate', function() {
    this.update({}, { $set: { updatedAt: Date.now() } });
  });

  module.exports = mongoose.model('users', newSchema);