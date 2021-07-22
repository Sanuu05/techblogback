const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content1:{
        type:String,
        required:true

    },
    content2:{
        type:String,
        required:true

    },
    content3:{
        type:String,
        required:true

    },
    subhead1:{
        type:String

    },
    subhead2:{
        type:String

    },

    productPic:[
        {
            img:{type:String}
        }
    ]
}, {timestamps: true});


const Post = mongoose.model("Post", postSchema)
module.exports = Post