var mongoose = require('mongoose');
var subactivitySchema = require('../models/subactivitySchema.js').schema;
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}
var activity = new Schema();

activity.add({
    "activity": { type: String},
    "image": { type: String},
    "subActivity": [subactivitySchema]
}
);

module.exports = mongoose.model('activity', activity);