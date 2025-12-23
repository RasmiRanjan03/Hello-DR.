import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import connectCloudinary from './config/cloudinary.js';
import cookieParser from 'cookie-parser';

import connectDB  from './config/mongodb.js';
import adminrouter  from './routes/adminroute.js';
const app = express();

const port = 3000;
connectDB();
connectCloudinary();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true,
}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
}   );
app.use('/api/admin',adminrouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});