const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://binodbastola8:04eDCQ9RfpI5394b@cluster0.ycso00y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Routes
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
