import { expect } from 'chai';
import fetch from 'node-fetch';

const baseUrl = 'http://localhost:3010/convert';  

describe('Temperature Conversion API', function() {
  this.timeout(5000);

  it('should convert Celsius to Fahrenheit correctly', async function() {
    const data = {
      type: 'convertCtoF',
      value: 25
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(body).to.have.property('result', '77.00');
    expect(body).to.have.property('unit', 'F');
  });

  it('should convert Fahrenheit to Kelvin correctly', async function() {
    const data = {
      type: 'convertFtoK',
      value: 77
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(body).to.have.property('result', '298.15');
    expect(body).to.have.property('unit', 'K');
  });

  
  it('should convert Kelvin to Celsius correctly', async function() {
    const data = {
      type: 'convertKtoC',
      value: 298.15
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const body = await response.json();

    expect(response.status).to.equal(200);
    expect(body).to.have.property('result', '25.00');
    expect(body).to.have.property('unit', 'C');
  });

 
  it('should return status 400 for invalid conversion type', async function() {
    const invalidData = {
      type: 'invalidType',
      value: 25
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidData)
    });

    const body = await response.text();

    expect(response.status).to.equal(400);
    expect(body).to.equal('Invalid conversion type');
  });

 
  it('should return status 400 for missing value field', async function() {
    const missingValueData = {
      type: 'convertCtoF'
      // value field is missing
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(missingValueData)
    });

    const body = await response.text(); 

    expect(response.status).to.equal(400);
    expect(body).to.equal('Invalid request data');
  });

  
  it('should return status 400 for missing type field', async function() {
    const missingTypeData = {
      value: 25
      // type field is missing
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(missingTypeData)
    });

    const body = await response.text(); 

    expect(response.status).to.equal(400);
    expect(body).to.equal('Invalid request data');
  });


});
