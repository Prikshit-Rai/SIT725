const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://prikshitrai27:zif40do92uSVEUZ5@cluster0.hrqfkl3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Create a schema and model for storing conversions
const conversionSchema = new mongoose.Schema({
    type: String,
    value: Number,
    result: Number,
    unit: String,
    date: { type: Date, default: Date.now }
});
const Conversion = mongoose.model('Conversion', conversionSchema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/convert', async (req, res) => {
    const { type, value } = req.body;
    let result;
    let unit;

    if (type === 'convertCtoF') {
        result = (value * 9/5) + 32;
        unit = 'F';
    } else if (type === 'convertFtoK') {
        result = ((value - 32) * 5/9) + 273.15;
        unit = 'K';
    } else if (type === 'convertKtoC') {
        result = value - 273.15;
        unit = 'C';
    } else {
        return res.status(400).send('Invalid conversion type');
    }

    const newConversion = new Conversion({ type, value, result, unit });
    await newConversion.save();

    res.json({ result: result.toFixed(2), unit });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3010;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
