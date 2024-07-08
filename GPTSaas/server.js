require('dotenv').config({ path: './config.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongoose');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

const port = process.env.PORT || 4242;

app.get('/', (req, res) => {
  res.send("OK");
});

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/auth', require('./routes/openai.js'));
app.use('/api/openai', require('./routes/openai'));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
