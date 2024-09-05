// models/conversionModel.js
import mongoose from 'mongoose';

const conversionSchema = new mongoose.Schema({
    type: String,
    value: Number,
    result: Number,
    unit: String
});

const Conversion = mongoose.model('Conversion', conversionSchema);

export { conversionSchema, Conversion };
