document.addEventListener('DOMContentLoaded', () => {
    const cToFButton = document.getElementById('convertCtoF');
    const fToKButton = document.getElementById('convertFtoK');
    const kToCButton = document.getElementById('convertKtoC');
    const inputSection = document.getElementById('inputSection');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultSection = document.getElementById('resultSection');
    const result = document.getElementById('result');
    const loadingSpinner = document.getElementById('loadingSpinner');

    let conversionType = '';

    // Initialize tooltips
    const elems = document.querySelectorAll('.tooltipped');
    const instances = M.Tooltip.init(elems);

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
            M.toast({html: 'Please enter a temperature value', classes: 'rounded'});
        }
    });

    clearBtn.addEventListener('click', () => {
        document.getElementById('temperature').value = '';
        resultSection.style.display = 'none';
        inputSection.style.display = 'none';
    });

    function showInputSection(labelText) {
        const label = document.querySelector('#inputSection label');
        label.textContent = labelText;
        inputSection.style.display = 'block';
        resultSection.style.display = 'none';
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
            M.toast({html: 'Error processing request. Please try again.', classes: 'rounded red'});
        });
    }
});