
var User = require('../modules/user');
var Post = require('../modules/post');
var LRU = require('lru-cache');
var config = require('config');

var lruOptions = {max: 100, maxAge: 1000*60}
var cache = LRU(lruOptions);

exports.getPosts = (req, res)=>{
    res.send('getPost');
}

exports.postPost = (req, res)=>{
    var data = req.body.content;
    var user = req.body.user;
    
    findUserByUserName(user).then((dbUser)=>{
        if(!dbUser){
            return res.send('Invalid user, can\'t create post')
        }
        
        var post = new Post({content:data, createdBy: dbUser._id })
        post.save()
        .then((result=>{res.send('post saved')}))
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

// GET request for getting top post sorted by upvotes and createdOn fields - GET:/
exports.getTopPosts = (req, res)=>{
    var num = config.top;
    var top = cache.get('top');

    if(top){
        console.log('got from cache: ' + new Date());
        res.send(top);
    }else{
        console.log('got from DB: ' + new Date());
        Post.find({}).sort({'voteCount':-1, 'crearedOn':-1}).limit(num).exec()
        .then((results)=>{
            var ans = JSON.stringify(results);
            cache.set('top', ans); 
            res.send(ans);
        })
        .catch((err)=>{res.send(err)})
    }
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
                return res.send('user already voted for this post')
            }
            dbUser.votedFor.push(dbPost._id);
            dbUser.save().then(()=>{
                dbPost.voteCounter = dbPost.voteCounter + val;
                dbPost.save().then(()=>{
                    res.send('voted successfully')
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

var findPostById = (postID)=>{
    return Post.findById(postID).exec();
}
