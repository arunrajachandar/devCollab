const express = require('express');
const usersRouter = express.Router();
const {body, validationResult } = require('express-validator');
const User = require('../../models/users');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route: POST api/user
//@desc:  User Registration
//@access: Private

usersRouter.post('/',[
    body('name').not().isEmpty().withMessage('Name is required').isLength({min: 5}).withMessage('Name should be min of 5 chars long'),
    body('password').not().isEmpty().withMessage('Password is required').isLength({min:5}).withMessage('Password should be min of 5 chars long'),
    body('email').not().isEmpty().withMessage('Email is required').isEmail().normalizeEmail().withMessage('Please enter a valid Email Id')
],async (req,res)=>{

        const error = await validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).send(error)
        }
        console.log(req.body)
        const { name, email, password} = req.body;

        
        try{
            const regUser = await User.findOne({
                email 
            })    
            if(regUser){
                res.status(400).send({
                    errors:[
                        {
                            msg: 'User already exists'
                        }
                    ]
                })
            }

           const avatar = await gravatar.url(email, {s: '200', r: 'pg', d: 'mp'});
           const salt = await bcrypt.genSaltSync(10);
           const hashedPasword = await bcrypt.hashSync(password, salt);
           user = new User({
               name,
               email,
               password,
               avatar
           })
           user.password = hashedPasword
           
           await user.save()
           
         const token =  await jwt.sign({ user: 
            {
               id: user.id
           } 
        },
         config.get('jwtSecret'),
         {
             expiresIn: 360000
         }         
    )
         res.status(200).send({token})
    }catch(err){
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

module.exports = usersRouter;