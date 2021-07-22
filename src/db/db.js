const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://sanz:sannu05@cluster0.s5xci.mongodb.net/blog?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log("db connect")
}).catch((err)=>{
    console.log(err)
});