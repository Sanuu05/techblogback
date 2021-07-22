const express = require('express')
const route = express.Router()
const Post = require('../models/post')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../back/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname)
  }
})

const upload = multer({ storage: storage })

route.post('/post', upload.array('productPic'),async(req, res) => {
  const { title, content1,content2, content3,subhead1, subhead2 } = req.body
  console.log(req.body)
  let productPic = []
  console.log(req.files)
  if (req.files.length > 0) {
    productPic = req.files.map(file => {
      return { img: file.filename }
    })
  }
  const data = new Post({
    title,
    content1,
    content2,
    content3,
    productPic,
    subhead1,
    subhead2
  })
  const savedata = await data.save()
  res.json({
    savedata
  })
})
// route.get('/upload/:filemame',(req,res)=>{
//   try {
//     console.log(req.params.filemame)
//     res.sendFile('./src/upload/'+req.params.filemame)
//   } catch (error) {
    
//   }
// })
route.get('/getpost', async(req,res)=>{
  try {
    const data = await Post.find().sort('-createdAt')
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})
route.delete('/deletepost/:id', async(req,res)=>{
  try {
    const data = await Post.findByIdAndRemove(req.params.id)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})
route.get('/getpostt/:id',async(req,res)=>{
  try {
    console.log(req.params.id)
    const data = await Post.findById(req.params.id)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})
route.patch("/updatepost/:id",upload.array('productPic'), async(req,res)=>{
  const { title, content1,content2,content3 } = req.body
  let productPic = []
  console.log(req.body)
  if (req.files.length > 0) {
    productPic = req.files.map(file => {
      return { img: file.filename }
    })
  }
  if(req.files.length>0){
    const data = await Post.findByIdAndUpdate(req.params.id,{title,content1,content2,content3,productPic})
    res.json(data)
  }else{
    const data = await Post.findByIdAndUpdate(req.params.id,{title,content1,content2,content3})
    res.json(data)
  }
  
} )

module.exports = route