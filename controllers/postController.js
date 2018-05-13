
var User = require('../modules/user');
var Post = require('../modules/post');

exports.getPosts = (req, res)=>{
    res.send('getPost');
}


exports.postPost = (req, res)=>{
    var data = req.body.content;
    var user = req.body.user;
    
    User.findOne({'userName':user}).exec().then((user)=>{
        if(!user){
            return res.send('Invalid user, can\'t create post')
        }
        
        var post = new Post({content:data, createdBy: user._id })
        post.save()
        .then((result=>{res.send('post created')}))
        .catch((err)=>{res.send(err)})
    })
    
}

// PUT req for updating posts content - PUT:/post/:postId
exports.updatePost = (req, res)=>{
    var data = req.body.content;
    var pid = req.params.postId;

    Post.findByIdAndUpdate(pid, {'content':data}, {new:true}).exec()
    .then((post)=>{
        res.send('post updated')
    })
    .catch((err)=>{res.send(err)})
}


exports.getTopPosts = (req, res)=>{
    var num = 15;

    Post.find({}).sort({'voteCount':-1, 'crearedOn':-1}).limit(num).exec()
    .then((results)=>{
        console.log(results.length);
        res.send(JSON.stringify(results))
    })
    .catch((err)=>{res.send(err)})
}


// PUT req for upVoting - PUT:/upvote/post/:postId/user/:username
exports.upVote = (req, res)=>{
    return vote(req, res, 1)
}

// PUT req for upVoting - PUT:/downvote/post/:postId/user/:username
exports.downVote = (req, res)=>{
   return vote(req, res, -1)
}


var vote = (req, res, val)=>{
    var pid = req.params.postId;
    var user = req.params.username;

    findUserByUserName(user)
    .then((dbUser)=>{
        findPostById(pid)
        .then((dbPost)=>{
            if(dbUser.votedFor.indexOf(dbPost._id)>=0){
                return res.send('user already voted for that post')
            }
            dbUser.votedFor.push(dbPost._id);
            dbUser.save().then(()=>{
                dbPost.voteCounter = dbPost.voteCounter + val;
                dbPost.save().then(()=>{
                    res.send('upvote done')
                })
            })

        })
        .catch((err)=>{res.send('find post error - ' + err )})
    })
    .catch((err)=>{res.send('find user error - ' + err)})
}


var findUserByUserName = (user)=>{
    return User.findOne({'userName':user}).exec();
}



var findPostByIdAndUpdate = (postID)=>{
    return Post.findByIdAndUpdate(pid, {$inc:{voteCounter:1}}, {new:true}).exec()

}

var findPostById = (postID)=>{
    return Post.findById(postID).exec();
}