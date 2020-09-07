const express = require('express');
const authRouter = express.Router();
const auth = require('../../middlewares/auth');
const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {body, validationResult } = require('express-validator');

//@route: get apis/auth
//@desc:  Authentication Purposes
//@access: Private

authRouter.get('/', auth, async(req,res)=> {
    try{
        const getUser = await User.findById(req.user.id).select('-password')

        res.send(getUser)
    }
    catch(err){
        res.status(500).send({
            errors:[{
                msg: 'Server Error'
            }]
        })
    }

})


//@route: POST api/auth
//@desc:  Sign In purposes
//@access: Private


authRouter.post('/',[
    body('password').not().isEmpty().withMessage('Password is required'),
    body('email').not().isEmpty().withMessage('Email is required').isEmail().normalizeEmail().withMessage('Please enter a valid Email Id')
],async (req,res)=>{

        const error = await validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).send(error)
        }
        const { email, password} = req.body;

        
        try{
            const signUser = await User.findOne({
                email 
            })    
            if(!signUser){
                res.status(400).send({
                    errors:[
                        {
                            msg: 'Invalid Credentials'
                        }
                    ]
                })
            }

           const isPassValid = await bcrypt.compare(password, signUser.password);
           
         const token =  await jwt.sign({ user: 
            {
               id: signUser.id
           } 
        },
         config.get('jwtSecret'),
         {
             expiresIn: 360000
         }         
    )
         res.send({token})
           
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

module.exports = authRouter;