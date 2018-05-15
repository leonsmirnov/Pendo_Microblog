var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('config');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var User = require('./routes/userRouter');
var Post = require('./routes/postRouter');


mongoose.connect(config.dbHost)
var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('error', function(err){console.log(err.message);});

db.once('open', function(){
    console.log('mongodb connection open')
});




app.use('/users', User);
app.use('/posts', Post);

var port = config.serverPort;
app.listen(port, ()=>{console.log('listening ong port: ' + port)})
