import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import { pool } from './config/db.config';
import allRoutes from './routes/index';
import cookies from 'cookie-parser';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cookies());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var corsOptions = {
//   origin: 'http://localhost:8081',
// };

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Happy Earthday' });
});

//routes
app.use('/api', allRoutes);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
