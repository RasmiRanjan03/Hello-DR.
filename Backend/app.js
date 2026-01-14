import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import connectCloudinary from './config/cloudinary.js';
import cookieParser from 'cookie-parser';

import connectDB  from './config/mongodb.js';
import adminrouter  from './routes/adminroute.js';
import doctorrouter from './routes/doctorroute.js';
import userrouter from './routes/userroute.js'
const app = express();

const port = 3000;
connectDB();
connectCloudinary();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://hello-dr-frontenf.onrender.com",
  "https://hello-dr-admin.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
}   );
app.use('/api/admin',adminrouter);
app.use('/api/doctor',doctorrouter)
app.use('/user',userrouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});