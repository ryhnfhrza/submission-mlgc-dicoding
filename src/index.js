require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./exceptions/errorHandler');
const predictRoutes = require('./routes/predictRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/predict', predictRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
