const express = require('express')
const app = express()
const port = 8888
const db = require('./db/db')
const post = require('./routes/post')
const cors = require('cors')

// app.get('/',(req,res)=>{
//     res.send("hello from server side")
// })

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use('/post',post)
app.get('/',(req,res)=>{
    res.send("hello")
})
app.listen(port,()=>{
    console.log(`sever running at ${port}`)
})
