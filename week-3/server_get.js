const express= require("express");
const path = require('path');
const app= express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.post('/convert', (req, res) => {
    const { type, value } = req.body;
    let result;
    let unit;

    if (type === 'convertCtoF') {
        result = (value * 9/5) + 32; 
        unit='F';
    } 
    else if (type === 'convertFtoK') {
        result = ((value - 32) * 5/9) + 273.15;
        unit ='K';
    } 
    else if (type === 'convertKtoC') {
        result = value - 273.15;
        unit ='C';
    }
    else {
        console.error('Invalid conversion type:', type);
        res.status(400).send('Invalid conversion type');
        return;
    }
    console.log('Calculated result:', result, unit);
    res.json({ result: result.toFixed(2), unit });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const port=3010;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
