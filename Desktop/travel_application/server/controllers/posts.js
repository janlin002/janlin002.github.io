import express from 'express';
import mongoose from "mongoose"

import PostMessage from "../models/postMessage.js"

const router = express.Router();

// 拿資料 影片()
export const getPosts = async(req, res)=>{
    try{
        const PostMessages = await PostMessage.find() // find(): 從資料庫裡面找資料，如果是()代表找全部資料，如果括號內有值，會去找相對應的值

        res.status(200).json(PostMessages)
    }catch(error){
        res.status(404).json({ message: error.message})
    }
}


// 新增 影片()
export const createPosts = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// 更新 影片(1:35:10)
export const updatePosts = async(req, res) =>{
    const { id: _id } = req.params; // 取得路由後方的id => http://localhost:2000/posts 會取得 posts

    if( !(mongoose.Types.ObjectId.isValid(_id)) ) return res.status(404).send('No post with this id') // 驗證是否包含

    const post = req.body

    const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id },  { new : true })

    // findByIdAndUpdate -> 參數 (要更改的id, 要更改的內容, 是否返回新文檔)

    // new : https://stackoverflow.com/questions/30419575/mongoose-findbyidandupdate-not-returning-correct-model

    res.json(updatePost)
}

// 刪除 影片()
export const deletePosts = async(req, res) =>{
    const { id } = req.params;

    if( !(mongoose.Types.ObjectId.isValid(id)) ) return res.status(404).send('No post with this id')

    await PostMessage.findByIdAndRemove(id)

    res.send({
        message: 'Post delete success!'
    })
}

// 按讚 影片()
export const likePosts = async(req, res) =>{
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if( !(mongoose.Types.ObjectId.isValid(id)) ) return res.status(404).send('No post with this id')

    // 找資料
    const post = await PostMessage.findById(id)

    // 找到資料後，更新裡面的likeCount
    const likePost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true })

    res.send(likePost)
}

export default router;

// req.query 取得路由指定內容
// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse => req.query.order => "desc"
// 會抓取 order 屬性裡面的內容