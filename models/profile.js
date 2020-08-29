const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    company:{
        type: String
    },
    website:{
        type: String
    },
    location:{
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    education:[
       {
           school:{
                type: String,
                required: true
           },
           degree:{
               type:String,
               required: true
           },
           specialization:{
               type: String,
               required: true
           },
           from:{
               type: Date
           },
           to: {
               type: Date
           },
           current: {
               type: Boolean,
               default: false
           },
           location: {
               type: String
           },
           description:{
               type: String
           }
       }
    ],
    experience:[
        {
            company:{
                 type: String,
                 required: true
            },
            designation:{
                type: String,
                required: true
            },
            from:{
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            yearsofexp:{
                type: Date
            },
            location: {
                type: String
            },
            description:{
                type: String
            }
        }
    ],
    bio:{
        type: String
    },
    githubusername:{
        type: String
    },
    socials:{
        youtube:{
            type: String
        },
        twitter:{
            type: String
        },
        facebook:{
            type: String
        },
        instagram:{
            type: String
        },
        linkedIn:{
            type: String
        }
    },
    dateofjoined:{
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)