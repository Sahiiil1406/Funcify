const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config(); 
const cors=require('cors');
const userRoutes=require('./routes/user.routes.js');
const functionRoutes=require('./routes/function.routes.js')
const cookieParser=require('cookie-parser')
const {runFunction}=require('./controllers/runner.js')

const app=express();
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(cookieParser());

//routes
app.use('/user',userRoutes);
app.use('/func',functionRoutes)
app.post('/invoke/:id',runFunction);


const connectDb=async ()=>{
    try {
        const url=process.env.MONGO_URL 
        await mongoose.connect(url);
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database',error.message);
    }
}
const PORT=process.env.PORT || 3000;
app.listen(PORT,async()=>{
    await connectDb();
    console.log('Server is running on port 3000');
});