document.addEventListener('DOMContentLoaded', () => {
    const cToFButton = document.getElementById('convertCtoF');
    const fToKButton = document.getElementById('convertFtoK');
    const kToCButton = document.getElementById('convertKtoC');
    const inputSection = document.getElementById('inputSection');
    const convertBtn = document.getElementById('convertBtn');
    const resultSection = document.getElementById('resultSection');
    const result = document.getElementById('result');
    const loadingSpinner = document.getElementById('loadingSpinner');

    let conversionType = '';

    cToFButton.addEventListener('click', () => {
        conversionType = 'convertCtoF';
        showInputSection('Enter temperature in Celsius');
    });

    fToKButton.addEventListener('click', () => {
        conversionType = 'convertFtoK';
        showInputSection('Enter temperature in Fahrenheit');
    });

    kToCButton.addEventListener('click', () => {
        conversionType = 'convertKtoC';
        showInputSection('Enter temperature in Kelvin');
    });

    convertBtn.addEventListener('click', () => {
        const temperature = document.getElementById('temperature').value;
        if (temperature !== '') {
            convertTemperature(conversionType, temperature);
        } else {
            alert('Please enter a temperature value');
        }
    });

    function showInputSection(labelText) {
        const label = document.querySelector('#inputSection label');
        label.textContent = labelText;
        inputSection.style.display = 'block';
    }

    function convertTemperature(type, value) {
        loadingSpinner.style.display = 'block';
        fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, value })
        })
        .then(response => response.json())
        .then(data => {
            loadingSpinner.style.display = 'none';
            result.textContent = `${data.result} ${data.unit}`;
            resultSection.style.display = 'block';
        })
        .catch(error => {
            loadingSpinner.style.display = 'none';
            console.error('Error:', error);
        });
    }
});
