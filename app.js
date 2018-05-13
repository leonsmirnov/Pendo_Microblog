var mongoose = require('mongoose');
// var User = require('./modules/user');
// var Post = require('./modules/post');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var User = require('./routes/userRouter');
var Post = require('./routes/postRouter');


mongoose.connect('mongodb://localhost:27017/test')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use('/users', User);
app.use('/posts', Post);

app.listen(3000, ()=>{console.log('listening ong port 3000')})

// var u1 = new User({ username:'leon2', votedFor:[]})
// u1.save()
// .then(()=>{
//     var p1 = new Post({ content: 'content2',createdBy:u1})
//     var p2 = new Post({ content: 'content2',createdBy:u1})
//     u1.votedFor.push(p1);
//     u1.votedFor.push(p2);
//     u1.save();
//     p1.save().catch(err=>{console.log('couldn"t save:' + err)}); 
    
// })
// .catch(err=> console.log(err)) 





