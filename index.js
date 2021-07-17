const express   = require('express');
const app       = express();
const mongoose  = require('mongoose')
const userRoutes = require('./src/routes/user.routes')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(res => {
    console.log('database terhubung')
})
.catch(err => {
    console.log('database tidak terhubung')
})

app.use(express.json())

app.use('/', userRoutes)

const port = process.env.PORT
app.listen(port, (req,res)=>{
    console.log(`server run at http://localhost:${port}`)
})