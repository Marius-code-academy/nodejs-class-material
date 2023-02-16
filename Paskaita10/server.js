import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import router from './router.js';
dotenv.config();

// 5. Sukurkite dar vieną route GET /products/, kuris paduos visus produktus su jų kategorijom (t.y. pavadinimas, kaina, kategorija - pvz. iPhone 7, 370.00, phones).
// 6. Sukurkite dar vieną route GET /categoryvalue/, šis paduos kiekvienos kategorijos produktų kainos sumą, pvz:

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';
console.log(MONGO_URI);

mongoose.connect(MONGO_URI, () => {
  console.log('Connected');
});

const app = express();
app.use(router);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
