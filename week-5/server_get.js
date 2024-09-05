const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const conversionController = require('./controllers/conversionController');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/temperature_converter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Routes
app.post('/convert', conversionController.convertTemperature);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const port = 3010;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
