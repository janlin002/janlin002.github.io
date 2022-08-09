import express from 'express'
import bodyParser from 'body-parser' // body-parser 是 Express 經常使用的中介軟體，用於解析請求的資料(body)
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRouter from './routes/posts.js'
import userRouter from './routes/users.js'

const app = express()
dotenv.config()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.json({limit: "30mb", extended: true}))

// 解析JSON格式 請求大小限制: 30mb, 擴展

app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

app.use('/posts', postRouter)
app.use('/users', userRouter)

app.get('/', (req, res)=>{
    res.send('ITS WORK')
})

// 解析urlencoded格式 請求大小限制: 30mb, 擴展

// const CONNECTION_URL = 'mongodb+srv://janlin:janlin@cluster0.huesm.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 2000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)))
    .catch((error)=> console.error(error.message))

// mongoose.set("useFindAndModify", false)

// 放置順序會影響程式: cors -> body-parser -> routers