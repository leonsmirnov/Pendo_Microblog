var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id:{type:Schema.ObjectId, default:()=>{new ObjectId()} , auto:true},
    userName: String,
    votedFor: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model('User', UserSchema );