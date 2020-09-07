const express = require('express');
const postsRouter = express.Router();
const auth = require('../../middlewares/auth');
const Posts = require('../../models/posts');
const {body, validationResult} = require('express-validator');
const User = require('../../models/users');

//@route: POST api/posts
//@desc:  Create Posts
//@access: Private

postsRouter.post('/', [auth,
    body('text', 'Text Field cannot ').not().isEmpty()
], async (req,res)=> {
    const errors = await validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors)
    }
    const {text} = req.body;
    try{
        const user = await User.findById(req.user.id).select(['name', 'avatar'])
        const postFields = {}
        postFields.name = user.name;
        postFields.avatar = user.avatar;
        postFields.text = text;
        postFields.user = req.user.id;
        const post = new Posts(postFields)
        await post.save()
        res.json(post)
    }catch(error){
        console.error(error.message);
        res.status(500).json({
            errors:[
                {
                    msg: 'Server Error'
                }
            ]
        })
    }

})

//@route: PUT api/posts
//@desc:  Modify Posts
//@access: Private

postsRouter.put('/:post_id', [auth,
    body('text', 'Text Field cannot be empty').not().isEmpty()
], async (req,res)=> {
    const errors = await validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors)
    }
    const {text} = req.body;
    try{
        const post = await Posts.findOneAndUpdate({_id: req.params.post_id},{
            $set: {
                text
            }
        },{
            new: true
        })
        await post.save()
        res.json(post)
    }catch(error){
        console.error(error.message);
        res.status(500).json({
            errors:[
                {
                    msg: 'Server Error'
                }
            ]
        })
    }

})

//@route: GET api/posts
//@desc:  Get all Posts
//@access: Private

postsRouter.get('/', auth, async (req,res)=> {
    const errors = await validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors)
    }
    try{
        const posts = await Posts.find({}).sort({ 'postedOn': -1})
        if(posts.length === 0){
            return res.status(404).json({errors: [{
                msg: 'No posts found yet'
            }]
        })
    }
        res.json(posts)
    }catch(error){
        res.status(500).json({
            errors:[
                {
                    msg: 'Server Error'
                }
            ]
        })
    }

})

//@route: GET api/posts/:id
//@desc:  Get post By ID
//@access: Private

postsRouter.get('/:id', auth, async (req,res)=> {
    const errors = await validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors)
    }
    try{
        const post = await Posts.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg: 'No post found'})
        }
        res.json(post)
    }catch(error){
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'No post found'})
        }

        res.status(500).json({
            errors:[
                {
                    msg: 'Server Error'
                }
            ]
        })
    }

})

//@route: DELETE api/posts/:id
//@desc:  Delete post By ID
//@access: Private

postsRouter.delete('/:id', auth, async (req,res)=> {
    try{
        //@delete experience
        const post = await Posts.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg: 'No post found'})
        }
        await post.remove()

        res.json({
            msg: 'Post Removed'
        })
    }catch(error){
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'No post found'})
        }

        res.status(500).json({
            errors:[{
                msg: 'Server Error'
            }]
        })
    }
})

//@route: PUT api/posts/:id/likes
//@desc:  Like post
//@access: Private

postsRouter.put('/:id/likes', auth, async (req,res)=> {
    try{

        let post = await Posts.findOne({_id: req.params.id})
        const user = await User.findById(req.user.id)
        if(!post){
            return res.status(404).json({msg: 'No post found'})
        }

        const findUser = post.likes.filter(likedUser => likedUser.user.toString() === req.user.id)

        if(!findUser.length){
            post = await Posts.findOneAndUpdate({_id:req.params.id},{
                $pull:{
                    unlikes:{
                        name: user.name,
                        avatar: user.avatar,
                        user: user.id
                    }    
                }
            },{
                new: true,
                multi: true
            })
            post.likes.unshift(
                {
                    name: user.name,
                    avatar: user.avatar,
                    user: user.id
                })
        
        }else{
            post = await Posts.findOneAndUpdate({_id:req.params.id},{
                $pull:{
                    likes:{
                        name: user.name,
                        avatar: user.avatar,
                        user: user.id
                    }    
                }
            },{
                new: true,
                multi: true
            })
    
    
        
        }

        await post.save();        


        res.json(post)

    }catch(error){
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'No post found'})
        }

        res.status(500).json({
            errors:[
                {
                    msg: 'Server Error'
                }
            ]
        })
    }

})

//@route: PUT api/posts/:id/likes
//@desc:  Like post
//@access: Private

postsRouter.put('/:id/unlikes', auth, async (req,res)=> {
    try{

        let post = await Posts.findOne({_id: req.params.id})
        const user = await User.findById(req.user.id)
        if(!post){
            return res.status(404).json({msg: 'No post found'})
        }

        const findUser = post.unlikes.filter(likedUser => likedUser.user.toString() === req.user.id)
        if(!findUser.length){
            post = await Posts.findOneAndUpdate({_id:req.params.id},{
                $pull:{
                    likes:{
                        name: user.name,
                        avatar: user.avatar,
                        user: user.id
                    }    
                }
            }
            ,{
                new: true,
                multi: true
            })
            post.unlikes.unshift(
                {
                    name: user.name,
                    avatar: user.avatar,
                    user: user.id
                })
            

        }else{
            post = await Posts.findOneAndUpdate({_id:req.params.id},{
                $pull:{
                    unlikes:{
                        name: user.name,
                        avatar: user.avatar,
                        user: user.id
                    }    
                }
            },{
                new: true,
                multi: true
            })
    
    
        
        }

        await post.save();        


        res.json(post)

    }catch(error){
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'No post found'})
        }

        res.status(500).json({
            errors:[
                {
                    msg: 'Server Error'
                }
            ]
        })
    }

})



//@route: POST api/posts/:id/comments
//@desc:  Comment post
//@access: Private


postsRouter.post('/:id/comments', [auth,
    body('text').not().isEmpty().withMessage('Text Field cannot be empty')
], async (req,res)=> {
    const errors = await validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(errors)
    }

    try{
        let post = await Posts.findById(req.params.id)
        const user = await User.findById(req.user.id)
        if(!post){
            return res.status(404).json({msg: 'No post found'})
        }

        
        const { text } = req.body;

            post.comments.unshift(
                {
                    name: user.name,
                    avatar: user.avatar,
                    user: user.id,
                    text
                })
                

    
        await post.save();        
        res.json(post)

    }catch(error){
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'No post found'})
        }

        res.status(500).json({
            errors:[
                {
                    msg: 'Server Error'
                }
            ]
        })
    }

})

//@route: PUT api/posts/:post_id/comments/:comment_id
//@desc:  Edit Comment on a Post
//@access: Private


postsRouter.put('/:post_id/comments/:comment_id', auth, async (req,res)=> {
    try{
        let post = await Posts.findById(req.params.post_id)
        const user = await User.findById(req.user.id)
        const findComment = post.comments.filter(comment => comment._id.toString() === req.params.comment_id)

        if(!post || findComment.length === 0){
            return res.status(404).json({msg: 'No comment found'})
        }


        const { text } = req.body;  

        if(text){
        post = await Posts.findOneAndUpdate({_id:req.params.post_id},{
            $set:{
                comments:{
                    name: user.name,
                    avatar: user.avatar,
                    user: user._id,
                    _id: req.params.comment_id,
                    text
                }    
            }
        },{
            new: true,
            multi: true
        })
        await post.save();      
    }else{
        return res.json({msg: 'No text has been added'})
    }
     
    
  
        res.json(post)

    }catch(error){
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'No post found'})
        }

        res.status(500).json({
            errors:[
                {
                    msg: 'Server Error'
                }
            ]
        })
    }

})

//@route: DELETE api/posts/:post_id/comments/:comment_id
//@desc:  Edit Comment on a Post
//@access: Private


postsRouter.delete('/:post_id/comments/:comment_id', auth, async (req,res)=> {
    try{
        let post = await Posts.findById(req.params.post_id)
        const user = await User.findById(req.user.id)

        const findComment = post.comments.filter(comment => comment._id.toString() === req.params.comment_id)
        console.log(findComment)
        if(!post || findComment.length === 0){
            return res.status(404).json({msg: 'No comment found'})
        }
        console.log(user.id)
        if(findComment[0].user.toString() !== user.id){
            return res.status(401).json({msg: 'Not authorised to delete'})
        }

        post = await Posts.findByIdAndUpdate(req.params.post_id,{
            $pull:{
                comments:{
                    name: user.name,
                    avatar: user.avatar,
                    user: user._id,
                    _id: req.params.comment_id,
                    text: findComment[0].text
                }    
            }
        },{
            new: true,
            multi: true
        })
        await post.save();        

     
  
        res.json({
            msg: 'Comment Removed',
            post
        })

    }catch(error){
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(404).json({msg: 'No post found'})
        }

        res.status(500).json({
            errors:[
                {
                    msg: 'Server Error'
                }
            ]
        })
    }

})

module.exports = postsRouter;