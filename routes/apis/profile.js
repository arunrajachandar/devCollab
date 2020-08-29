const express = require('express');
const profileRouter = express.Router();
const auth = require('../../middlewares/auth');
const Profile = require('../../models/profile');
const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {body, validationResult } = require('express-validator');
const fetch = require('node-fetch');

//@route: GET api/profile/all
//@desc:  Get all profiles
//@access: Public

profileRouter.get('/all', async (req,res)=> {
    try{
        const profiles = await Profile.find().populate('user',
        ['name','avatar'])
        res.status(200).json({profiles})       

    }catch(error){
        return res.status(500).json({
            errors:[{
                msg: 'Server Error'
            }]
        })
    }
})

//@route: GET api/profile/me
//@desc:  Get Current Profile
//@access: Private


profileRouter.get('/me', auth, async (req,res)=> {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate(
            'user',
            ['name','avatar']
            )
        if(!profile){
            res.status(404).json({
                errors: [
                    {
                        msg: 'User ID does not exist'
                    }
                ]
            })
        } 
        res.status(200).json({profile})       

    }catch(error){
        return res.status(500).json({
            errors:[{
                msg: 'Server Error'
            }]
        })
    }
})


//@route: GET api/profile/user/:user_id
//@desc:  Get Current Profile
//@access: Private


profileRouter.get('/user/:user_id', auth, async (req,res)=> {
    console.log(req.params)
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate(
            'user',
            ['name','avatar']
            )
        if(!profile){
            res.status(404).json({
                errors: [
                    {
                        msg: 'User ID does not exist'
                    }
                ]
            })
        } 
        res.status(200).json({profile})       

    }catch(error){
        return res.status(500).json({
            errors:[{
                msg: 'Server Error'
            }]
        })
    }
})


//@route: DELETE api/profile/
//@desc:  Delete Profile, User & Posts
//@access: Private


profileRouter.delete('/', auth, async (req,res)=> {
    try{
        //@delete posts 
        //@delete profile
        await Profile.findOneAndRemove({user: req.user.id})
        //@delete user
        await User.findOneAndRemove({_id: req.user.id})
        res.json({
            msg: 'User deleted'
        })
    }catch(error){
        return res.status(500).json({
            errors:[{
                msg: 'Server Error'
            }]
        })
    }
})



//@route: POST api/user
//@desc:  User Registration
//@access: Private

profileRouter.post('/',[
    auth,
    body('skills').not().isEmpty().withMessage('Skillsets required'),
    body('status').not().isEmpty().withMessage('Designation required')
],async (req,res)=>{

        const error = await validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).send(error)
        }
        const { company,
            website,
            bio,
            location,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            instagram,
            twitter,
            linkedIn,
            user
         } = req.body;

        const profileFields = {}
        
         if(company) profileFields.company = company
         if(website) profileFields.website = website
         if(bio) profileFields.bio = bio
         if(location) profileFields.location = location
         if(status) profileFields.status = status
         if(githubusername) profileFields.githubusername = githubusername

         if(skills) profileFields.skills = skills.split(',').map(skill => skill.trim())

         profileFields.socials = {}

         if(facebook) profileFields.socials.facebook = facebook
         if(twitter) profileFields.socials.twitter = twitter
         if(instagram) profileFields.socials.instagram = instagram
         if(youtube) profileFields.socials.youtube = youtube
         if(linkedIn) profileFields.socials.linkedIn = linkedIn
         console.log(profileFields)
         profileFields.user = req.user.id

    try{            
        let profile = await Profile.findOne({user: req.user.id})
        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {
                $set: profileFields
            },{
                new: true
            })
            return res.json({profile})
        }
        profile = new Profile(profileFields);
        await profile.save()
        console.log(profile)
        res.json({profile})
    }catch(err){
        console.error(err.message)
        res.status(500).send({
            errors:[
                {
                msg: 'Server Error'
            }
            ]
        }
        )
    }

}
 )


//@route: PUT api/profile/experience
//@desc:  Add experience
//@access: Private

profileRouter.put('/experience',[
    auth,
    body('company').not().isEmpty().withMessage('Company Name Required'),
    body('designation').not().isEmpty().withMessage('Designation required'),
    body('from').not().isEmpty().withMessage('From date required')
],async (req,res)=>{

        const error = await validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).send(error)
        }
        const { company,
            designation,
            from,
            to,
            current,
            location,
            description
         } = req.body;

         const newExp = {
            company,
            designation,
            from,
            to,
            current,
            location,
            description
         }
         if(!to && current){
             newExp.to = Date.now()
         }

    try{            
        let profile = await Profile.findOne({user: req.user.id})
        // let experience = [...profile.experience, newExp]
        // console.log(experience)
        profile.experience.unshift(newExp)
        await profile.save()
        res.json({profile})
    }catch(err){
        console.error(err)
        res.status(500).send({
            errors:[
                {
                msg: 'Server Error'
            }
            ]
        }
        )
    }

}
 )

//@route: DELETE api/profile/
//@desc:  Delete Experience
//@access: Private


profileRouter.delete('/experience/:exp_id', auth, async (req,res)=> {
    try{
        //@delete experience
        const profile = await Profile.findOne({user: req.user.id})
        const removeId = profile.experience.map(exp => exp._id).indexOf(req.params.exp_id)
        profile.experience.splice(removeId, 1)
        await profile.save()

        res.json({
            msg: 'Experience Removed'
        })
    }catch(error){
        return res.status(500).json({
            errors:[{
                msg: 'Server Error'
            }]
        })
    }
})

//@route: PUT api/profile/education
//@desc:  Add education
//@access: Private

profileRouter.put('/education',[
    auth,
    body('school').not().isEmpty().withMessage('School Name Required'),
    body('degree').not().isEmpty().withMessage('Degree required'),
    body('specialization').not().isEmpty().withMessage('Specialization required')
],async (req,res)=>{

        const error = await validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).send(error)
        }
        const { school,
            degree,
            specialization,
            from,
            to,
            current,
            location,
            description
         } = req.body;

         const newExp = {school,
            degree,
            specialization,
            from,
            to,
            current,
            location,
            description
         }
         if(!to && current){
             newExp.to = Date.now()
         }

    try{            
        let profile = await Profile.findOne({user: req.user.id})
        // let experience = [...profile.experience, newExp]
        // console.log(experience)
        profile.education.unshift(newExp)
        await profile.save()
        res.json({profile})
    }catch(err){
        console.error(err)
        res.status(500).send({
            errors:[
                {
                msg: 'Server Error'
            }
            ]
        }
        )
    }

}
 )

//@route: DELETE api/profile/
//@desc:  Delete Education
//@access: Private


profileRouter.delete('/education/:edu_id', auth, async (req,res)=> {
    try{
        //@delete experience
        const profile = await Profile.findOne({user: req.user.id})
        const removeId = profile.education.map(exp => exp._id).indexOf(req.params.edu_id)
        profile.education.splice(removeId, 1)
        await profile.save()

        res.json({
            msg: 'Education Removed'
        })
    }catch(error){
        return res.status(500).json({
            errors:[{
                msg: 'Server Error'
            }]
        })
    }
})


//@route: GET api/profile/github/:username
//@desc:  Get github repos
//@access: Public


profileRouter.get('/github/:username', async (req,res)=> {
    try{
        const response = await fetch('https://api.github.com/users/'+req.params.username+'/repos?client_id='+config.get('gitClientId')+'&client_secret='+config.get('gitClientSecret'),{
            method: 'GET',
            headers:{
                'User-Agent':'Awesome-Octocat-App'                
            }
        })
        if(response.status !== 200){
            return res.status(404).json({msg:'Profile not found'})
        }
        res.json(await response.json())
    }catch(error){  
        console.log(error)
        return res.status(500).json({
            errors:[{
                msg: 'Server Error'
            }]
        })
    }
})


module.exports = profileRouter;