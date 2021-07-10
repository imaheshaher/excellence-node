const express = require('express')
const { env } = require('./config/config')
const app = express()
const port = env.port
const mongoose = require("mongoose")
const cors = require('cors')
const userRoute = require("./routes/userRoute")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',userRoute)

mongoose.connect(env.mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,

},(err) => {
    if(err){
        console.log(err)
    }
    else {
        console.log('Database  connected successfully..')
    }
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))