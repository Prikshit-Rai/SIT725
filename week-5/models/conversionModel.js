const mongoose = require('mongoose');

const conversionSchema = new mongoose.Schema({
    type: String,
    value: Number,
    result: Number,
    unit: String,
    date: { type: Date, default: Date.now }
});

const Conversion = mongoose.model('Conversion', conversionSchema);

module.exports = Conversion;
