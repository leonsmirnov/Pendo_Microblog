
var User = require('../modules/user');

exports.getUsers = (req, res)=>{
    User.find({})
    .then((result)=>{
        res.send(result)
    })
}

exports.getUserByUserName = (req, res)=>{
    var user = req.params.userName
    User.findOne({userName:user})
    .then((result)=>{
        if(!result){
            res.send(user + ' not found')
        }else{
            res.send(result);
        }
    })
}



exports.postUser = (req, res)=>{
    var user = req.body.userName;
    User.findOne({userName:user})
    .then((result)=>{
        if(result===null){
            var tmp = new User({userName:user})
            tmp.save()
            .then(()=>{res.send(user + ' created and saved to DB')})
            .catch((err)=>{res.send(err)});
        }else{
            res.send('user alredy exists..') 
        }
    })
    .catch((err)=>{res.send(err)});
}
