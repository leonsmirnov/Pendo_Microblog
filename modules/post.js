var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    _id:{type:Schema.ObjectId, default: function () { return new ObjectId()} , auto:true},
    content: String,
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    createdOn: { type: Date, default: Date.now },
    voteCounter: {type: Number, default:0}
});

module.exports = mongoose.model('Post', PostSchema );