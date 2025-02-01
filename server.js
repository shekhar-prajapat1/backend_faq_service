
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const faqRoutes = require('./routes/faqRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost:27017/faqDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/faqs', faqRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
