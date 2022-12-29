const express = require('express')
const connectDb = require('./Database/connect')
const app = (express())
const dotenv = require('dotenv').config()

connectDb()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/blogs',require('./routes/blogRoutes'))

app.listen(4000, ()=>console.log('server active on port 4000'))