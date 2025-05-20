import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config({});

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("MongoDb is connected")
}).catch((er)=>{
   console.log(er)
});

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/test', (req, res) => {
  res.json({message:'I am backend !'});
});
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err,req,res,next) =>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success : false,
    statusCode,
    message
  })
});