import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type:Schema.Types.Mixed,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    updated_at:{
        type: Date,
        default: Date.now()
    },
})

const Post = mongoose.model('Post', postSchema) 
export default Post