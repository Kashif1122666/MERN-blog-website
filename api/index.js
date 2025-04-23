import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({});

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("MongoDb is connected")
}).catch((er)=>{
   console.log(er)
});

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});