const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    text:{
        type: String,
        required: true
    },
    name:{
        type: String
    },
    avatar:{
        type: String
    },
    likes:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            name:{
                type: String
            },
            avatar:{
                type: String
            }
        }
    ],
    unlikes:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            name:{
                type: String
            },
            avatar:{
                type: String
            }
        }
    ],
    comments:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId
            },
            text:{
                type: String,
                required: true
            },
            name:{
                type: String
            },
            avatar:{
                type: String
            },
            commentedOn:{
                type: Date,
                default: Date.now
            },
            likes:[
                {
                    user:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'users'
                    },
                    name:{
                        type: String
                    },
                    avatar:{
                        type: String
                    }
                }
            ],
            unlikes:[
                {
                    user:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'users'
                    },
                    name:{
                        type: String
                    },
                    avatar:{
                        type: String
                    }
                }
            ]
        }
    ],
    postedOn:{
        type: Date,
        default: Date.now
    }
})

module.exports = Posts = mongoose.model('posts', postsSchema)