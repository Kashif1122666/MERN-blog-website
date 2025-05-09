import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';

dotenv.config({});

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("MongoDb is connected")
}).catch((er)=>{
   console.log(er)
});

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/user', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/test', (req, res) => {
  res.json({message:'I am backend !'});
});
