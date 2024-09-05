import * as ConversionModel from '../models/conversionModel.js';

const { Conversion } = ConversionModel;

// Now you can access everything like this:
// const { conversionSchema, Conversion } = ConversionModel;
export const convertTemperature = async (req, res) => {
    const { type, value } = req.body;

    // Validate request data
    if (type === undefined || value === undefined) {
        return res.status(400).send('Invalid request data');
    }

    let result;
    let unit;

    switch (type) {
        case 'convertCtoF':
            result = (value * 9/5) + 32;
            unit = 'F';
            break;
        case 'convertFtoK':
            result = ((value - 32) * 5/9) + 273.15;
            unit = 'K';
            break;
        case 'convertKtoC':
            result = value - 273.15;
            unit = 'C';
            break;
        default:
            return res.status(400).send('Invalid conversion type');
    }

    const newConversion = new Conversion({ type, value, result, unit });
    await newConversion.save();

    res.json({ result: result.toFixed(2), unit });
};

