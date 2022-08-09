import express from 'express'

import { getPosts, createPosts, updatePosts, deletePosts, likePosts } from '../controllers/posts.js'

// 新增刪除修改都需要帶身份驗證 
import auth from '../middleware/auth.js'

const router = express.Router()

//http://localhost:2000/posts

// 這邊的資料，會跟 client/api 裡面的資料一樣

// 拿資料
router.get('/', getPosts)

// 上傳
router.post('/', auth, createPosts);

// 更新
router.patch('/:id', auth, updatePosts) // 如果只是想要修改 api 裡的部分內容，可以考慮使用 patch

// 刪除功能
router.delete('/:id', auth, deletePosts)

// 按讚功能
router.patch('/:id/likePost', auth, likePosts)

export default router

// put 跟 patch 最大的不同就 put 會全部更新，patch 只會更新須更新的部分(節省效能??)