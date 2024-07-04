const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const boardRouter = require('./routes/boards');
const PORT = process.env.PORT||3000
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("mongodb connected")})
.catch(error =>{console.log('error connecting to db',error)});

//Routes
app.use('/api/boards', boardRouter);

//listen to the requests
app.listen(PORT, ()=>{
    console.log('server is listening at', PORT);
});