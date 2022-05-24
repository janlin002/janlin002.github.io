import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: new Date()
    }
})

var PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage

// 每個 model 會 map 到 MongoDB 上生成一群文件的 collection

// Schema ，是用來定義 collections 中的 documents 的形狀